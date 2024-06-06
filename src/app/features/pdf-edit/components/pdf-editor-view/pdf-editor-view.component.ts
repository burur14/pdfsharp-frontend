import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import * as pdfjsLib from 'pdfjs-dist';
import { Store } from '@ngrx/store';
import { downloadFileAction, downloadTxtFileAction, updateImageItemsAction } from '../../store/pdf-edit.actions';
import { Subject, debounceTime } from 'rxjs';
import { ProjectModel } from 'src/app/features/explorer/models/project-model';
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

@Component({
  selector: 'app-pdf-editor-view',
  templateUrl: './pdf-editor-view.component.html',
  styleUrls: ['./pdf-editor-view.component.scss']
})
export class PdfEditorViewComponent implements AfterViewInit {

  @Input() textItems: TextItem[] = [];
  @Input() imageItems: ImageItem[] = [];
  @Input() pageNum = 1;
  @Input() selectedPageImages: ImageItem[] = [];
  @Input() project = new ProjectModel();

  @Input() isLoadingProject = false;
  @Input() isLoadingImages = false;

  @Output() setPageNumEvent = new EventEmitter<{ pageNum: number, selectedImageItems: ImageItem[] }>();

  @ViewChild("myCanvas", { static: false }) canvas!: ElementRef;
  @ViewChild("drawCanvas", { static: false }) drawCanvas!: ElementRef;

  pdfDoc?: pdfjsLib.PDFDocumentProxy;
  pageRendering = false;
  pageNumPending: number | null = 0;
  scale = 1;

  pdfScale = 80;
  drawCtx: any;
  pdfCtx: any;

  // Add variables for image dragging and resizing
  isDragging = false;

  private startX: number = 0;
  private startY: number = 0;
  private isDown: boolean = false;
  private draggingResizer: number = -1;
  private draggingImage: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;

  private updateSelectedItemsSubject = new Subject<void>();

  canvasOffset: any;
  offsetX = 0;
  offsetY = 0;

  hasDrew: boolean = false;

  activeImageIndex: number = 0;

  constructor(private store: Store) {

    this.updateSelectedItemsSubject.pipe(
      debounceTime(500) // Only emit if there's a 500 ms gap between calls
    ).subscribe(() => {
      ////////////////////!!!!!!!!!!!!!!!!!!this.store.dispatch(updateImageItemsAction({ newImageItems: this.selectedPageImages }));
    });
  }

  ngAfterViewInit() {
    this.drawCtx = this.drawCanvas.nativeElement.getContext('2d');
    this.drawCtx.imageSmoothingEnabled = false;
    this.drawCtx.webkitImageSmoothingEnabled = false;
    this.drawCtx.mozImageSmoothingEnabled = false;

    this.imageItems.forEach(item => {
      item.imageObj.src = item.imageData;
    });

  }

  preSetImageSettings() {
    this.imageItems.forEach((imageItem, index) => {

      imageItem.imageWidth = imageItem.imageWidth || imageItem.imageObj.width;
      imageItem.imageHeight = imageItem.imageHeight || imageItem.imageObj.height;

      while (imageItem.imageWidth > this.pdfCtx.canvas.clientWidth ||
        imageItem.imageHeight > this.pdfCtx.canvas.clientHeight
      ) {
        imageItem.imageWidth *= 0.5;
        imageItem.imageHeight *= 0.5;
      }

      imageItem.imageRight = imageItem.imageRight || imageItem.xPos + imageItem.imageWidth;
      imageItem.imageBottom = imageItem.imageBottom || imageItem.yPos + imageItem.imageHeight;
    });

    this.drawAllImages();
  }


  // Add event handlers for image dragging and resizing
  handleMouseDown(e: MouseEvent) {
    this.startX = e.clientX - this.offsetX;
    this.startY = e.clientY - this.offsetY;

    this.selectedPageImages.forEach((item, index) => {
      const resizer = this.anchorHitTest(this.startX, this.startY, item);
      if (resizer > -1) {
        this.draggingResizer = resizer;
        this.isDown = true;
        this.activeImageIndex = index;
      }
    });

    if (this.draggingResizer < 0) {
      this.selectedPageImages.forEach((item, index) => {
        if (this.hitImage(this.startX, this.startY, item)) {
          this.isDown = true;
          this.draggingImage = true;
          this.activeImageIndex = index;
        }
      });
    }
  }

  handleMouseUp(e: MouseEvent) {
    if (this.hasDrew) {
      this.draggingResizer = -1;
      this.draggingImage = false;
      this.isDown = false;
      this.drawAllImages();
    }
  }

  handleMouseOut(e: MouseEvent) {
    this.handleMouseUp(e);
  }

  // Method to handle mouse move event
  handleMouseMove(e: MouseEvent) {
    if (!this.isDown) return;

    const activeItem = this.selectedPageImages[this.activeImageIndex];

    if (this.draggingResizer > -1) {
      this.mouseX = e.clientX - this.offsetX;
      this.mouseY = e.clientY - this.offsetY;

      // Resize the image
      switch (this.draggingResizer) {
        case 0:
          // top-left
          activeItem.xPos = this.mouseX;
          activeItem.imageWidth = activeItem.imageRight - this.mouseX;
          activeItem.yPos = this.mouseY;
          activeItem.imageHeight = activeItem.imageBottom - this.mouseY;
          break;
        case 1:
          // top-right
          activeItem.yPos = this.mouseY;
          activeItem.imageWidth = this.mouseX - activeItem.xPos;
          activeItem.imageHeight = activeItem.imageBottom - this.mouseY;
          break;
        case 2:
          // bottom-right
          activeItem.imageWidth = this.mouseX - activeItem.xPos;
          activeItem.imageHeight = this.mouseY - activeItem.yPos;
          break;
        case 3:
          // bottom-left
          activeItem.xPos = this.mouseX;
          activeItem.imageWidth = activeItem.imageRight - this.mouseX;
          activeItem.imageHeight = this.mouseY - activeItem.yPos;
          break;
      }

      if (activeItem.imageWidth < 25) { activeItem.imageWidth = 25; }
      if (activeItem.imageHeight < 25) { activeItem.imageHeight = 25; }

      // Set the image right and bottom
      activeItem.imageRight = activeItem.xPos + activeItem.imageWidth;
      activeItem.imageBottom = activeItem.yPos + activeItem.imageHeight;

      // Redraw the images with resizing anchors
      this.drawAllImages();

    } else if (this.draggingImage) {
      this.mouseX = e.clientX - this.offsetX;
      this.mouseY = e.clientY - this.offsetY;

      // Move the image by the amount of the latest drag
      const dx = this.mouseX - this.startX;
      const dy = this.mouseY - this.startY;
      activeItem.xPos += dx;
      activeItem.yPos += dy;
      activeItem.imageRight += dx;
      activeItem.imageBottom += dy;
      // Reset the startXY for next time
      this.startX = this.mouseX;
      this.startY = this.mouseY;

      // Redraw the images with borders
      this.drawAllImages();
    }
  }

  drawAllImages() {
    this.drawCtx.clearRect(0, 0, this.drawCanvas.nativeElement.width, this.drawCanvas.nativeElement.height);

    this.selectedPageImages.forEach(imageItem => {
      this.drawCtx.drawImage(
        imageItem.imageObj,
        0, 0, imageItem.imageObj.width, imageItem.imageObj.height,
        imageItem.xPos, imageItem.yPos, imageItem.imageWidth, imageItem.imageHeight
      );

      this.drawAnchorsAndBorders(imageItem);
    });

    this.hasDrew = true;
    this.updateSelectedItemsSubject.next();
  }

  drawAnchorsAndBorders(imageItem: ImageItem) {
    this.drawDragAnchor(imageItem.xPos, imageItem.yPos);
    this.drawDragAnchor(imageItem.imageRight, imageItem.yPos);
    this.drawDragAnchor(imageItem.imageRight, imageItem.imageBottom);
    this.drawDragAnchor(imageItem.xPos, imageItem.imageBottom);

    this.drawCtx.beginPath();
    this.drawCtx.moveTo(imageItem.xPos, imageItem.yPos);
    this.drawCtx.lineTo(imageItem.imageRight, imageItem.yPos);
    this.drawCtx.lineTo(imageItem.imageRight, imageItem.imageBottom);
    this.drawCtx.lineTo(imageItem.xPos, imageItem.imageBottom);
    this.drawCtx.closePath();
    this.drawCtx.stroke();
  }

  // Method to draw a single draggable anchor
  drawDragAnchor(x: number, y: number) {
    this.drawCtx.beginPath();
    this.drawCtx.arc(x, y, 8, 0, Math.PI * 2, false);
    this.drawCtx.closePath();
    this.drawCtx.fill();
  }

  // Method to check if a point is inside a resizing anchor
  anchorHitTest(x: number, y: number, imageItem: ImageItem): number {
    let dx = x - imageItem.xPos;
    let dy = y - imageItem.yPos;

    if (dx * dx + dy * dy <= 64) {
      return 0; // top-left
    }

    dx = x - imageItem.imageRight;
    dy = y - imageItem.yPos;

    if (dx * dx + dy * dy <= 64) {
      return 1; // top-right
    }

    dx = x - imageItem.imageRight;
    dy = y - imageItem.imageBottom;

    if (dx * dx + dy * dy <= 64) {
      return 2; // bottom-right
    }

    dx = x - imageItem.xPos;
    dy = y - imageItem.imageBottom;

    if (dx * dx + dy * dy <= 64) {
      return 3; // bottom-left
    }

    return -1; // not inside any anchor
  }

  // Method to check if a point is inside the image
  hitImage(x: number, y: number, imageItem: ImageItem): boolean {
    return x > imageItem.xPos && x < imageItem.xPos + imageItem.imageWidth &&
      y > imageItem.yPos && y < imageItem.yPos + imageItem.imageHeight;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  setPdf(pdfDocument: string) {
    this.pageNum = 1;
    var loadingTask = pdfjsLib.getDocument({ data: atob(pdfDocument) });
    loadingTask.promise.then(pdf => {
      this.pdfDoc = pdf;
      this.renderPage(this.pageNum);
    });
  }

  renderPage(pageNum: number) {
    if (pageNum !== 0) {
      this.pageRendering = true;
      // Using promise to fetch the page
      this.pdfDoc!.getPage(pageNum).then((page) => {
        var viewport = page.getViewport({ scale: this.scale });

        this.canvas.nativeElement.height = 0;
        this.canvas.nativeElement.width = 0;

        var canvasElement = document.getElementById("myCanvas")!;
        this.canvasOffset = {
          top: canvasElement.offsetTop,
          left: canvasElement.offsetLeft
        };
        this.offsetX = this.canvasOffset.left + 320 - viewport.width / 2;
        this.offsetY = this.canvasOffset.top + 115;

        this.canvas.nativeElement.height = viewport.height;
        this.canvas.nativeElement.width = viewport.width;

        this.drawCanvas.nativeElement.height = viewport.height;
        this.drawCanvas.nativeElement.width = viewport.width;

        // this.
        this.pdfCtx = this.canvas.nativeElement.getContext("2d");
        this.pdfCtx.imageSmoothingEnabled = false;
        this.pdfCtx.webkitImageSmoothingEnabled = false;
        this.pdfCtx.mozImageSmoothingEnabled = false;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: this.pdfCtx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false;
          if (this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(this.pageNumPending);
            this.pageNumPending = null;
          }
          this.selectedPageImages = this.imageItems.filter(i => i.pdfPage === pageNum)
          this.updateImagesAndRender(pageNum);
        });
      });

      // Update page counters
      document.getElementById('page_num')!.textContent = pageNum.toString();

    }
  }

  updateImagesAndRender(pageNum: number) {
    this.preSetImageSettings();
  }

  printDocument() {
    this.store.dispatch(downloadFileAction({projectName: this.project.name, projectId: this.project.id}));
  }

  printCode() {
    this.store.dispatch(downloadTxtFileAction({projectName: this.project.name + "_PdfSharp_Code", projectId: this.project.id}));
  }

  queueRenderPage(num: number) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  nextPage() {
    if (this.pageNum >= this.pdfDoc!.numPages) {
      return;
    }
    this.pageNum++;
    this.setPageNumEvent.emit({ pageNum: this.pageNum, selectedImageItems: this.selectedPageImages });
    this.queueRenderPage(this.pageNum);
  }

  prevPage() {
    if (this.pageNum <= 1) {
      return;
    }
    this.pageNum--;
    this.setPageNumEvent.emit({ pageNum: this.pageNum, selectedImageItems: this.selectedPageImages });
    this.queueRenderPage(this.pageNum);
  }

  zoomOut() {
    this.pdfScale -= 10;
  }

  zoomIn() {
    this.pdfScale += 10;
  }
}