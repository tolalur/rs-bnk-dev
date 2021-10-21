import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
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
  constructor() { }

  ngOnInit(): void {
  }

}
