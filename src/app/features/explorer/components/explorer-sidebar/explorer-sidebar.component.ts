import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-explorer-sidebar',
  templateUrl: './explorer-sidebar.component.html',
  styleUrls: ['./explorer-sidebar.component.scss']
})
export class ExplorerSidebarComponent implements OnInit {

  @Output() addNewProjectEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addNewProject() {
    this.addNewProjectEvent.emit();
  }
}
