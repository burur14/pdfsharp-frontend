import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ImageItem,
  Item,
  TextItem,
} from 'src/app/features/pdf-edit/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item!: Item;

  @Output() deleteItemEvent = new EventEmitter<number>();

  isTextItem(item: Item): item is TextItem {
    return 'fontSize' in item;
  }

  isImageItem(item: Item): item is ImageItem {
    return 'opacity' in item;
  }
  
  constructor() {}

  ngOnInit() {}

  toggleItem() {
    this.item.isHidden = !this.item.isHidden;
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.item.id);
  }
}
