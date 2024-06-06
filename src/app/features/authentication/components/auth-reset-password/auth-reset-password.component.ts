import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../services/models/reset-password.model';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {
  
  emailToReset = '';
  emailToken = '';
  newPassword = '';

  resetPasswordObj = new ResetPassword();

  @Output() closeModalEvent = new EventEmitter();
  @Output() submitModalEvent = new EventEmitter<ResetPassword>();


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];

      this.emailToken = uriToken.replace(/ /g,'+');
      console.log(this.emailToken);
      console.log(this.emailToReset);
    })
  }

  reset() {
    this.resetPasswordObj.email = this.emailToReset;
    this.resetPasswordObj.newPassword = this.newPassword;
    this.resetPasswordObj.confirmPassword = this.newPassword;
    this.resetPasswordObj.emailToken = this.emailToken;
  }
  
  submitForm() {
    this.submitModalEvent.emit(this.resetPasswordObj);
  }
  closePopup() {
    this.closeModalEvent.emit();
  }
}
