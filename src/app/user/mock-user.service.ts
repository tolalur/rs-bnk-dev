import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {UserLoginResponse} from './types/user.model';

@Injectable({
  providedIn: 'root',
})
export class MockUserService {
  // eslint-disable-next-line
  get(url: string): Observable<any> {
    return of(true);
  }

  // eslint-disable-next-line
  post(url: string, data: any): Observable<UserLoginResponse> {
    return of({
      token: 'super-puper-token',
      email: 'test@test.com',
      name: 'UserName',
    });
  }
}
