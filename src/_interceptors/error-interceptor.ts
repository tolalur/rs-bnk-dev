import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {UserService} from '../app/user/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private service: UserService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      switch (error.status) {
        case 401:
          this.service.logout();
          break;
        case 404:
          this.router.navigate(['/']);
      }
      return throwError(error);
    }));
  }
}
