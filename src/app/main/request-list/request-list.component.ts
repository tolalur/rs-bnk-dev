import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  displayedColumns: string[] = ['creationDate', 'id', 'endReservationDate', 'projectId', 'statusChangeDate', 'status'];
  dataSource = [];

  constructor() { }

  ngOnInit(): void {
  }

}
