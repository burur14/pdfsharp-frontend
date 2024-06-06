import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addMessagesAction } from 'src/app/core/store/auth.actions';
import { MessageModel } from 'src/app/shared/models/message-model';
import { TokenApiModel } from 'src/app/core/components/models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const myToken = this.authService.getToken();

        if (myToken) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${myToken}` }
            });
        }

        return next.handle(req).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // this.router.navigateByUrl('/authentication');
                        // const error = MessageModel.fromJson(err);
                        // this.store.dispatch(addMessagesAction({message: error}));
                        return this.handleUnAuthorizedError(req, next);
                    }
                }
                return throwError(() => new Error("Smth else"))
            })
        );
    }

    handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
        let tokenApiModel = new TokenApiModel();

        tokenApiModel.accessToken = this.authService.getToken()!;
        tokenApiModel.refreshToken = this.authService.getRefreshToken()!;
        return this.authService.renewToken(tokenApiModel).pipe(
            switchMap((data: TokenApiModel) => {
                this.authService.setRefreshToken(data.refreshToken);
                this.authService.setToken(data.accessToken);

                req = req.clone({
                    setHeaders: { Authorization: `Bearer ${data.accessToken}` }
                });
                return next.handle(req);
            }),
            catchError((err) => {
                return throwError(() => {

                })
            })
        );
    }
}
