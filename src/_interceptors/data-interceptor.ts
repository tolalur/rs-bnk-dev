import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {GeneralDialogComponent} from '../app/general-dialog/general-dialog.component';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        map( (event : HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event.clone({
              body: event.body.data ? event.body.data : event.body
            });
          }

          return event
        }),
        tap(event => {

          if (event instanceof HttpResponse && event.body.errmsg) {
            this.dialog.open(GeneralDialogComponent, {
              width: '100%',
              maxWidth: '900px',
              data: event.body.errmsg
            })
          }
        })
      )
  }
}
