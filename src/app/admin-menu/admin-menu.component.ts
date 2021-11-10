import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
  menuItems = [
    {
      link: 'request',
      title: 'ЗАЯВКИ'
    },{
      link: 'users',
      title: 'ПОЛЬЗОВАТЕЛИ'
    },{
      link: 'reports',
      title: 'ОТЧЁТЫ'
    },{
      link: 'settings',
      title: 'НАСТРОЙКИ'
    }
  ]

  get isUserAdmin() {
    return this.service.isUserAdmin
  }

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

}
