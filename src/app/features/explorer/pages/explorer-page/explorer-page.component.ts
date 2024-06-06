import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../models/project-model';
import { Store } from '@ngrx/store';
import { selectProjects } from '../../store/explorer.selector';
import { addProjectAction, getProjectsAction } from '../../store/explorer.actions';
import { AuthService } from 'src/app/features/authentication/services/auth.service';

@Component({
  selector: 'app-explorer-page',
  templateUrl: './explorer-page.component.html',
  styleUrls: ['./explorer-page.component.scss']
})
export class ExplorerPageComponent implements OnInit {

  projects = <ProjectModel[]>[];

  isAddNewProjectModalVisible = false;

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit() {
    // this.projects = [
    //   new ProjectModel(1,"First Project",1), 
    //   new ProjectModel(2,"Second Project",1), 
    //   new ProjectModel(3,"Third Project",1),
    //   new ProjectModel(4,"Fours Project",1),
    //   new ProjectModel(5,"Fifth Project",1),
    // ];
    this.initData();
    this.getDataFromStore();
  }

  initData() {
    const userId = this.authService.getAuthenticatedUser()?.id!;
    this.store.dispatch(getProjectsAction({ userId }));
  }

  getDataFromStore() {
    this.store.select(selectProjects).subscribe(
      projects => this.projects = projects
    );
  }

  openAddNewProjectModal() {
    this.isAddNewProjectModalVisible = true;
  }

  closeAddNewProjectModal() {
    this.isAddNewProjectModalVisible = false;
  }



}
