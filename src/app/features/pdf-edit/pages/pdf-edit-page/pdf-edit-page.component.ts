import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import { Store } from '@ngrx/store';
import { selectImageItems, selectIsLoadingImages, selectPageNum, selectTextItems } from '../../store/pdf-edit.selector';
import * as _ from 'lodash';
import { PdfEditorViewComponent } from '../../components/pdf-editor-view/pdf-editor-view.component';
import { addImageItemAction, getImagesAction, setDocumentPageAction, updateImageItemsAction } from '../../store/pdf-edit.actions';
import { getUsersAction } from 'src/app/core/store/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProjectModel } from 'src/app/features/explorer/models/project-model';
import { getProjectAction } from 'src/app/features/explorer/store/explorer.actions';
import { selectIsLoadingProject, selectProject } from 'src/app/features/explorer/store/explorer.selector';
@Component({
  selector: 'app-pdf-edit-page',
  templateUrl: './pdf-edit-page.component.html',
  styleUrls: ['./pdf-edit-page.component.scss'],
})
export class PdfEditPageComponent implements OnInit {

  project = new ProjectModel();

  textItems = <TextItem[]>[];
  imageItems = <ImageItem[]>[];
  selectedPageImages = <ImageItem[]>[];

  pdfDocumentString: string = '';
  pageNum = 1;

  addImagePopupVisible = false;

  isLoadingProject = false;
  isLoadingImages = false;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) { }

  @ViewChild(PdfEditorViewComponent) child!: PdfEditorViewComponent;

  ngOnInit() {
    let projectId = 0;
    this.activatedRoute.paramMap.subscribe(params => {
      projectId = Number(params.get('projectId')!);
    });

    this.store.dispatch(getProjectAction({ projectId }));
    
    this.store.dispatch(getImagesAction({ projectId }));
    
    this.getDataFromStore();
  }

  private getDataFromStore() {
    this.store.select(selectIsLoadingProject).subscribe(isLoadingProject => this.isLoadingProject = isLoadingProject);
    this.store.select(selectIsLoadingImages).subscribe(isLoadingImages => this.isLoadingImages = isLoadingImages);

    this.store.select(selectTextItems).subscribe(textItems => this.textItems = _.cloneDeep(textItems));
    this.store.select(selectImageItems).subscribe(imageItems => {
      this.imageItems = _.cloneDeep(imageItems);

      this.imageItems.forEach(i =>
        i.imageObj.src = i.imageData
      );

      this.selectedPageImages = this.imageItems.filter(i => i.pdfPage === this.pageNum);
      setTimeout(() => {
        this.child.updateImagesAndRender(this.pageNum);
      }, 500);
    });
    this.store.select(selectPageNum).subscribe(pageNum => {
      this.pageNum = pageNum;
    });
    this.store.select(selectProject).subscribe(project => {
      this.project = _.cloneDeep(project);
      this.convertToBase64(project.base64AttachmentCode);
    });
  }

  convertToBase64(pdfDocumentString: string) {
    this.child.setPdf(pdfDocumentString);
  }

  saveChanges() {
    this.selectedPageImages.forEach(i => this.roundImageProps(i));

    this.store.dispatch(updateImageItemsAction({newImageItems: this.selectedPageImages}));
  }

  roundImageProps(image: ImageItem) {
    image.imageBottom = Math.round(image.imageBottom);
    image.imageHeight = Math.round(image.imageHeight);
    image.imageWidth = Math.round(image.imageWidth);
    image.imageRight = Math.round(image.imageRight);
  }
  
  addImageFromPopup(imageObj: HTMLImageElement) {
    this.saveChanges();
    const newItem: ImageItem = {
      id: this.generateId(),
      name: `Image ${this.generateId()}`,
      xPos: 0,
      yPos: 0,
      rotation: 0,
      isHidden: false,
      viewId: this.project.id,
      opacity: 1.0,
      imageWidth: Math.round(imageObj.width),
      imageHeight: Math.round(imageObj.height),
      imageRight: 0,
      imageBottom: 0,
      imageObj: imageObj,
      imageData: imageObj.src,
      pdfPage: this.pageNum
    };
    
    this.store.dispatch(addImageItemAction({ image: newItem }));
    this.closeAddImagePopup();
  }

  pageChanged(event: { pageNum: number, selectedImageItems: ImageItem[] }) {
    this.saveChanges();

    const pageNum = event.pageNum;
    const selectedPageImages = event.selectedImageItems;

    this.store.dispatch(setDocumentPageAction({pageNum}));
    this.selectedPageImages = this.imageItems.filter(i => i.pdfPage === pageNum);
    this.child.updateImagesAndRender(pageNum);
  }

  updateSelectedItems() {
    this.selectedPageImages = this.imageItems.filter(i => i.pdfPage === this.pageNum);

  }

  openAddImagePopup() {
    this.addImagePopupVisible = true;
  }

  closeAddImagePopup() {
    this.addImagePopupVisible = false;
  }

  private generateId(): number {
    return this.imageItems.length + 1;
  }
}
