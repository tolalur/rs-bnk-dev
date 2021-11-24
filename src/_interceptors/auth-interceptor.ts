import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../app/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: UserService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserToken = this.service.token;

    if (currentUserToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`
        }
      });
    }

    return next.handle(request)
  }
}
