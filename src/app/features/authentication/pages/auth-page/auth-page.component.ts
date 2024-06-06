import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { confirmResetPasswordAction, deleteMessagesAction, logInUserAction, resetPasswordAction, signInUserAction, toggleLoginPopupAction } from '../../../../core/store/auth.actions';
import { UserModel } from '../../models/user-model';
import { selectIsForgotPasswordModelOpen, selectIsLoginPage, selectMessages } from '../../../../core/store/auth.selector';
import * as _ from 'lodash';
import { RoleModel } from '../../models/role-model';
import { RoleEnum } from '../../enums/role-enum';
import { MessageModel } from 'src/app/shared/models/message-model';
import { ResetPassword } from '../../services/models/reset-password.model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  isLoginPage = true;
  messages = <MessageModel[]>[];
  authRole = new RoleModel(1, RoleEnum.AUTHUSER, 'Authenticated User')

  isForgotPasswordModelOpen = false;
  isResetPasswordModelOpen = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.getDataFromStore();
  }

  getDataFromStore() {
    this.store.select(selectIsLoginPage).subscribe(isLoginPage => this.isLoginPage = _.cloneDeep(isLoginPage));

    this.store
      .select(selectMessages)
      .subscribe((messages) => (this.messages = messages));
  }

  toggleSignUpPopup() {
    this.store.dispatch(toggleLoginPopupAction({ isLoadingPage: !this.isLoginPage }));
  }

  logIn(user: UserModel) {
    user.role = this.authRole;

    this.store.dispatch(logInUserAction({ user: { ...user } }));
  }

  signIn(user: UserModel) {
    user.role = this.authRole;
    this.store.dispatch(signInUserAction({ user: { ...user } }));
  }

  openForgotPasswordModal() {
    this.isForgotPasswordModelOpen = true;
  }

  closeForgotPasswordModal() {
    this.isForgotPasswordModelOpen = false;
  }

  openResetPasswordModal() {
    this.isResetPasswordModelOpen = true;
  }

  submitForgotPasswordModal(upn: string) {
    this.store.dispatch(resetPasswordAction({ upn }));
  }

  closeResetPasswordModal() {
    this.isResetPasswordModelOpen = false;
  }

  submitResetPasswordModal(resetPasswordObj: ResetPassword) {
    this.store.dispatch(confirmResetPasswordAction({ resetPasswordObj }));
    this.closeResetPasswordModal();
  }

  deleteMessages() {
    this.store.dispatch(deleteMessagesAction());
  }

}
