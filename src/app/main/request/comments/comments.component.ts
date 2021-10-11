import { Component, OnInit } from '@angular/core';

export  interface Comment  {
  date: string;
  author: string;
  text: string;
}
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  newComment: string | undefined;

  comments: Comment[] = [
    {
      date: 'Mon Oct 11 2021 16:56:55 GMT+0300 (Москва, стандартное время)',
      author: 'Иванов Олег',
      text: 'Прошу добавить в заявку еще 2 порта UTP RJ45 ',
    },
    {
      date: 'Wed Mar 02 2011 00:00:00 GMT+0300 (Москва, стандартное время)',
      author: 'Администратор',
      text: 'Для резервирования был изменен номер стойки ',
    },
    {
      date: 'Wed Mar 02 2011 00:00:00 GMT+0300 (Москва, стандартное время)',
      author: 'Администратор',
      text: 'Для резервирования был изменен номер стойки. Для резервирования \n' +
        'был изменен номер стойки. Для резервирования был изменен номер\n' +
        'стойки ',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
