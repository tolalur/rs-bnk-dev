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
  email = new FormControl('', [Validators.required, Validators.email]);
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
    if (this.email.hasError('required')) {
      return 'Поле не может быть пустым';
    }

    return this.email.hasError('email') ? 'Не валидный email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Поле не может быть пустым' : '';
  }

  onLogin() {
    if (this.password.valid && this.email.valid) {
      this.userService
        .login({email: this.email.value, password: this.password.value})
        .pipe(untilDestroyed(this))
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
