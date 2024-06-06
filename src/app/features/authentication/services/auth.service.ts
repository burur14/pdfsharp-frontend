import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user-model';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AUTHENTICATED_USER } from 'src/app/core/store/auth.effects';
import { TokenApiModel } from 'src/app/core/components/models/token-api.model';
import { ResetPassword } from './models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private readonly baseUrl = 'User';
  private userPayload: any;

  jwtHelper = new JwtHelperService();


  get decodedToken() {
    const token = this.getToken()!;
    return this.jwtHelper.decodeToken(token);
  }

  get fullNameFromToken() {
    return this.userPayload?.name;
  }

  get roleFromToken() {
    return this.userPayload?.role;
  }

  constructor(http: HttpClient, private router: Router) {
    super(http);
    this.userPayload = this.decodedToken;
  }

  signUp(user: UserModel): Observable<UserModel> {
    const url = `${this.baseUrl}/register`;

    return this.post<UserModel, UserModel>(url, user).pipe(
      map((response) => UserModel.fromJson(response))
    );
  }

  logIn(user: UserModel): Observable<TokenApiModel> {
    const url = `${this.baseUrl}/authenticate`;

    return this.post(url, user);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/authentication');
  }

  setRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUpn(): string {
    const token = this.getToken();
    if (!token) return '';

    return (
      this.jwtHelper.decodeToken(token).upn || this.jwtHelper.decodeToken(token).email
    );
  }

  getUsers(): Observable<UserModel[]> {
    const url = `${this.baseUrl}`;

    return this.get(url);
  }

  getUserByUpn(upn: string): Observable<UserModel> {
    const url = `${this.baseUrl}/info/${upn}`;

    return this.get<UserModel>(url).pipe(
      map((response) => UserModel.fromJson(response))
    );
  }

  getAuthenticatedUser(): UserModel | null {
    const authenticatedUserString = localStorage.getItem(AUTHENTICATED_USER);
    if (!authenticatedUserString) return null;

    const authenticatedUserJson = JSON.parse(authenticatedUserString);
    return UserModel.fromJson(authenticatedUserJson);
  }

  renewToken(tokenApi: TokenApiModel): Observable<TokenApiModel> {
    const url = `${this.baseUrl}/refresh`
    return this.post(url, tokenApi);
  }
  
  sendResetPasswordLink(email: string) {
    const url = `${this.baseUrl}/send-reset-email/${email}`;
    
    return this.post(url, undefined);
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    const url = `${this.baseUrl}/reset-password`
    
    return this.post(url, resetPasswordObj);
  }

}
