import {Injectable} from '@angular/core';
import {MockUserService} from './mock-user.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserLogin} from './types/user.model';
import {UserLoginResponse} from './types/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'login';

  private logoutUrl = 'logout';

  private userStoreKey = 'user-store-data';

  set user(val) {
    window.sessionStorage.setItem(this.userStoreKey, JSON.stringify(val));
  }

  get user(): UserLoginResponse | undefined {
    const data = window.sessionStorage.getItem(this.userStoreKey);
    return data ? JSON.parse(data) : data;
  }

  constructor(private http: MockUserService, private router: Router) {
  }

  login(data: UserLogin): Observable<UserLoginResponse> {
    return this.http.post(this.loginUrl, data).pipe(tap((val) => (this.user = val)));
  }

  logout(): Observable<any> {
    this.deleteUserData();
    this.router.navigate(['/login']);
    return this.http.get(this.logoutUrl);
  }

  deleteUserData(): void {
    window.sessionStorage.removeItem(this.userStoreKey);
  }
}
