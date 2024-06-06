import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from 'src/app/features/explorer/models/project-model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project = new ProjectModel();

  @Output() openProjectEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  openProject(projectId: number) {
    this.openProjectEvent.emit(projectId);
  }

}
