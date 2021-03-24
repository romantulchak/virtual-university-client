import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/tokenStorage.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
        let headers = req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token).set('type', this.token.getType());
      authReq = req.clone({ headers: headers });
    }
    return next.handle(authReq).pipe( tap(() => {},
    err=> {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      this.token.clearStorage();
      this.router.navigate(['login']);
    }
  }));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];