import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import {
  deleteImageItemAction,
  deleteTextItemAction,
} from '../../store/pdf-edit.actions';

@Component({
  selector: 'app-pdf-items-sidebar',
  templateUrl: './pdf-items-sidebar.component.html',
  styleUrls: ['./pdf-items-sidebar.component.scss'],
})
export class PdfItemsSidebarComponent implements OnInit {
  @Input() textItems = <TextItem[]>[];
  @Input() imageItems = <ImageItem[]>[];
  @Input() selectedPageImages = <ImageItem[]>[];

  @Output() documentUploadedEvent = new EventEmitter<string>();
  @Output() addImageEvent = new EventEmitter();
  @Output() saveChangesEvent = new EventEmitter();

  pdfDocumentString: string = '';

  constructor(
    private store: Store,
    private location: Location,
  ) { }

  ngOnInit() { }

  deleteTextItem(itemId: number) {
    this.store.dispatch(deleteTextItemAction({ itemId }));
  }

  deleteImageItem(imageId: number) {
    this.store.dispatch(deleteImageItemAction({ imageId }));
  }

  addImage() {
    this.addImageEvent.emit();
  }

  saveChanges() {
    this.saveChangesEvent.emit();
  }

  navigateBack() {
    this.location.back();
  }

  convertPdfToBase64() {
    var selectedFileInput = document.getElementById("inputFile") as HTMLInputElement;
    var selectedFile = selectedFileInput.files!;

    // Check if the file is not empty
    if (selectedFile.length > 0) {
      // Select the first file from the list
      let fileToLoad = selectedFile[0];

      // FileReader function for reading the file.
      let fileReader = new FileReader();

      // Onload of file read the file content
      fileReader.onload = (fileLoadedEvent) => {
        // Ensure that result is a string
        let base64 = fileLoadedEvent.target!.result as string;

        this.pdfDocumentString = base64.slice(base64.indexOf(',') + 1);

        this.documentUploadedEvent.emit(this.pdfDocumentString);
      };

      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }
}
