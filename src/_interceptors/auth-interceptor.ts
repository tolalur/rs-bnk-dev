import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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

    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse && (event.body && event.body.status == 401 || event.status == 401)) {
          this.service.logout();
        }

        return event;
      })
    );
  }
}
