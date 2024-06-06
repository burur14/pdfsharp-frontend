import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageModel } from '../models/message-model';
import { MessageTypeEnum } from '../enums/message-type-enum';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() messages = <MessageModel[]>[];

  @Output() deleteMessagesEvent = new EventEmitter();

  getStatusClass(status: MessageTypeEnum): string {
    return status.toLocaleLowerCase().replace(' ', '-');
  }

  deleteMessages() {
    this.deleteMessagesEvent.emit();
  }
}
