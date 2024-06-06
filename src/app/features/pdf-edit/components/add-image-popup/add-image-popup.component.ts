import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-add-image-popup',
    templateUrl: './add-image-popup.component.html',
    styleUrls: ['./add-image-popup.component.scss']
})
export class AddImagePopupComponent implements OnInit {
   
    @Output() closePopupEvent = new EventEmitter();
    @Output() confirmPopupEvent = new EventEmitter();

    dropzoneFile: File | null = null;
    imageObj: HTMLImageElement | null = null;

    ngOnInit() { }

    addImageFile(event: DragEvent) {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0 && files[0].type.startsWith('image/')) {
            this.dropzoneFile = files[0];
            this.convertFileToImage(this.dropzoneFile);
        }
    }

    selectImageFromExplorer(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0 && input.files[0].type.startsWith('image/')) {
            this.dropzoneFile = input.files[0];
            this.convertFileToImage(this.dropzoneFile);
        }
    }

    convertFileToImage(file: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target?.result as string;
            this.imageObj = image;
        };
        reader.readAsDataURL(file);
    }

    closePopup() {
        this.closePopupEvent.emit();
    }

    uploadFiles() {
        this.confirmPopupEvent.emit(this.imageObj);
    }

}
