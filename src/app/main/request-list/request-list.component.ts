import { Component, OnInit } from '@angular/core';
import {RequestService} from "../request.service";
import {RequestModel} from "../types/request.model";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  displayedColumns: string[] = [
    'creationDate',
    'applicationNumber',
    'user',
    'endReservationDate',
    'projectId',
    'statusChangeDate',
    'status'];
  dataSource = [];

  constructor(private service: RequestService) { }

  ngOnInit(): void {
    this.service
      .getList().subscribe((requestList: RequestModel[]) => {
        // @ts-ignore
      this.dataSource = requestList;
        console.log(requestList);
      });
  }

}
