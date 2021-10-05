import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from "../request.service";
import {RequestModel} from "../types/request.model";
import {untilDestroyed} from "ngx-take-until-destroy";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'creationDate',
    'applicationNumber',
    'user',
    'endReservationDate',
    'projectId',
    'statusChangeDate',
    'status'];
  dataSource = [];
  isLoadingResults = true;

  constructor(private service: RequestService) { }

  ngOnInit(): void {
    this.service
      .getList()
      .pipe(untilDestroyed(this))
      .subscribe((requestList: RequestModel[]) => {
        this.isLoadingResults = false;
        // @ts-ignore
        this.dataSource = requestList;
          console.log(requestList);
        });
  }

  ngOnDestroy(): void {}

}
