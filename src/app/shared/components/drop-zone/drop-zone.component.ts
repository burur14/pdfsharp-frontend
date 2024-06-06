import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent implements OnInit {

  active: boolean = false;

  toggleActive(): void {
      this.active = !this.active;
  }

  constructor() { }

  ngOnInit() {
  }

}
