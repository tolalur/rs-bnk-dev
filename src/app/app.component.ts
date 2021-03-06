import {Component} from '@angular/core';
import {UserService} from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bank';
  constructor(private userService: UserService) {
  }

  isUserLogin(): boolean {
    return !!this.userService.user
  }

  logout() {
    this.userService.logout()
  }
}
