import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserLogin, UserRolesEnum} from './types/user.model';
import {UserLoginResponse} from './types/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = environment.apiPrefix + '/login';
  private logoutUrl = environment.apiPrefix + '/logout';

  private userStoreKey = 'user-store-data';

  set user(val) {
    this.user$.next(val)
    window.sessionStorage.setItem(this.userStoreKey, JSON.stringify(val));
  }

  get user(): UserLoginResponse | null {
    const data = window.sessionStorage.getItem(this.userStoreKey);
    this.user$.next(data ? JSON.parse(data) : null)
    return data ? JSON.parse(data) : null;
  }

  user$ = new BehaviorSubject<UserLoginResponse | null>(null)

  get isUserNotAdmin(): boolean {
    return this.user?.roles[0].name == UserRolesEnum.USER;
  }

  get isUserNetAdmin(): boolean {
    return !!this.user?.roles.some(role => role.name == UserRolesEnum.NET_ADMIN);
  }

  get isUserAdmin(): boolean {
    return !!this.user?.roles.some(role => role.name == UserRolesEnum.ADMIN);
  }

  get token() {
    return this.user?.token
  }

  get id() {
    return this.user?.userId;
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.loginUrl, data).pipe(tap((val) => {this.user = val; console.log(this.user);
    }));
  }

  logout(): Observable<any> {
    this.user = null;
    this.router.navigate(['/login']);
    return this.http.post(this.logoutUrl, {});
  }
}
