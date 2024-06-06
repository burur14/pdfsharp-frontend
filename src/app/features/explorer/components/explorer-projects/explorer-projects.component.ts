import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../models/project-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorer-projects',
  templateUrl: './explorer-projects.component.html',
  styleUrls: ['./explorer-projects.component.scss']
})
export class ExplorerProjectsComponent implements OnInit {

  @Input() projects = <ProjectModel[]>[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openProjectById(projectId: number) {
    this.router.navigateByUrl(`explorer/project/${projectId}`);
  }

}
