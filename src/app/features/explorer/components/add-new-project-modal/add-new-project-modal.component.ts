import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProjectModel } from '../../models/project-model';
import { addProjectAction } from '../../store/explorer.actions';
import { AuthService } from 'src/app/features/authentication/services/auth.service';

@Component({
  selector: 'app-add-new-project-modal',
  templateUrl: './add-new-project-modal.component.html',
  styleUrls: ['./add-new-project-modal.component.scss']
})
export class AddNewProjectModalComponent implements OnInit {

  @Output() closePopupEvent = new EventEmitter();

  dropzoneFile: File | null = null;
  pdfDocumentString: string = '';

  newProject = new ProjectModel();

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit() {
  }

  addImageFile(event: DragEvent) {
    const files = event.dataTransfer?.files;
    if (files && files.length > 0 && files[0].type.startsWith('image/')) {
      this.dropzoneFile = files[0];
    }
  }

  selectImageFromExplorer(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.dropzoneFile = input.files[0];
    }
  }

  closePopup() {
    this.closePopupEvent.emit();
  }

  createNewProject() {
    let fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent) => {

      let base64 = fileLoadedEvent.target!.result as string;

      this.pdfDocumentString = base64.slice(base64.indexOf(',') + 1);
      
      this.newProject.base64AttachmentCode = this.pdfDocumentString;
      this.newProject.name = "Aboba";
      this.newProject.userId = this.authService.getAuthenticatedUser()?.id!;

      this.store.dispatch(addProjectAction({project: this.newProject}));

    };

    if(this.dropzoneFile)
      fileReader.readAsDataURL(this.dropzoneFile);

    this.closePopup();
  }

}
