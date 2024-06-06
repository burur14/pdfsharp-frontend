import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfEditPageComponent } from './pages/pdf-edit-page/pdf-edit-page.component';

const routes: Routes = [
    {
      path: ':projectId',
      component: PdfEditPageComponent,
      loadChildren: () =>
      import('../../features/explorer/explorer.module').then((m) => m.ExplorerModule),

    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PdfEditRoutingModule {}
  