import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../app/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.user) {
     return this.router.navigate(['/login']);
    }

    return !!this.userService.user;
  }
}
