import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() size: AvailableSizes = '1x'

  constructor() { }

  ngOnInit() {
  }

}

type AvailableSizes = '1x' | '2x' | '3x' | '4x' | '5x' | 'lg' | 'sm';
