import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { ItemComponent } from './components/item/item.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleUp,
  faAnglesDown,
  faArrowLeftLong,
  faArrowsUpDownLeftRight, faBan, faCheck, faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp, faCircle, faCircleNotch, faDownload, faFilter, faLock, faPlus, faQuestion,
  faSortDown,
  faSortUp, faTrash,
  faUpload, faXmark,faFileExcel,faExchange,faFilePen,
  faCircleExclamation, faCircleCheck, faArrowRightFromBracket, faShare, faTriangleExclamation,
  faX, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { DropZoneComponent } from './components/drop-zone/drop-zone.component';
import { CrossButtonComponent } from './components/cross-button/cross-button.component';
import { ToastComponent } from './toast/toast.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({ extend: true }),
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    ButtonComponent,
    SelectComponent,
    ItemComponent,
    DropZoneComponent,
    CrossButtonComponent,
    ToastComponent,
    LoaderComponent,
    ProjectItemComponent
  ],
  exports: [
    ButtonComponent,
    SelectComponent,
    ItemComponent,
    DropZoneComponent,
    CrossButtonComponent,
    ToastComponent,
    LoaderComponent,
    ProjectItemComponent,
    FontAwesomeModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faQuestion,
      faSortUp,
      faSortDown,
      faChevronRight,
      faChevronLeft,
      faChevronUp,
      faChevronDown,
      faAnglesDown,
      faAngleDoubleUp,
      faArrowLeftLong,
      faDownload,
      faArrowsUpDownLeftRight,
      faXmark,
      faTrash,
      faCircleNotch,
      faFilter,
      faCheck,
      faLock,
      faCircle,
      faUpload,
      faPlus,
      faBan,
      faCircleExclamation,
      faCircleCheck,
      faArrowRightFromBracket,
      faShare,
      faFileExcel,
      faExchange,
      faFilePen,
      faTriangleExclamation,
      faEnvelope,
      faX,
    );
  }
}
