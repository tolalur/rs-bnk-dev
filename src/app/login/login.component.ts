import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  login = new FormControl('', [Validators.required]);
  password = new FormControl('', Validators.required);


  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }


  getEmailErrorMessage() {
    return this.login.hasError('required') ? 'Поле не может быть пустым' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Поле не может быть пустым' : '';
  }

  onLogin() {
    console.log('pip');
    if (this.password.valid && this.login.valid) {
      this.userService
        .login({login: this.login.value, password: this.password.value})
        .pipe(untilDestroyed(this))
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
