import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../app/user/user.service';
import {map} from 'rxjs/operators';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  constructor(private service: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        map( (event : HttpEvent<any>) => {

          if (event instanceof HttpResponse) {
            return event.clone({
              body: event.body.data
            });
          }

          return event
        })
      )
  }
}
