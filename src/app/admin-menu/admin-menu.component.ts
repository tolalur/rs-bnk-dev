import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
  menuItems: { link: string, title: string }[];

  constructor(private service: UserService) {
    this.menuItems = [
      {
        link: 'request',
        title: 'ЗАЯВКИ'
      },
    ]
      .concat(this.service.isUserNetAdmin
        ? [{link: 'reports', title: 'ОТЧЁТЫ'}]
        : []
      )
      .concat(this.service.isUserAdmin
        ? [{link: 'reports', title: 'ОТЧЁТЫ'}, {link: 'settings', title: 'НАСТРОЙКИ'}, {link: 'users', title: 'ПОЛЬЗОВАТЕЛИ'}]
        : []
      );
  }

  ngOnInit(): void {
  }

}
