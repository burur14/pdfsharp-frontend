import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: './auth-forgot-password.component.html',
  styleUrls: ['./auth-forgot-password.component.scss']
})
export class AuthForgotPasswordComponent implements OnInit {

  userUpn = '';

  @Output() closeModalEvent = new EventEmitter();
  @Output() submitModalEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }
  
  submitForm() {
    this.submitModalEvent.emit(this.userUpn);
  }

  closePopup() {
    this.closeModalEvent.emit();
  }
}
