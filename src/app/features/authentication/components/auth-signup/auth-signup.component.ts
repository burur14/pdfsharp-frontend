import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { RoleEnum } from '../../enums/role-enum';
import { RoleModel } from '../../models/role-model';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  user = new UserModel();


  @Output() openLoginUpPopupEvent = new EventEmitter();
  @Output() signInEvent = new EventEmitter<UserModel>();

  constructor() { }

  ngOnInit() {
  }
  
  openLoginUp() {
    this.openLoginUpPopupEvent.emit();
  }

  signIn() {
    this.signInEvent.emit(this.user);
  }

}
