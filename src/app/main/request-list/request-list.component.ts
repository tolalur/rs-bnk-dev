import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RequestService} from "../request.service";
import {RequestModel} from "../types/request.model";
import {untilDestroyed} from "ngx-take-until-destroy";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = [
    'creationDate',
    'applicationNumber',
    'user',
    'endReservationDate',
    'projectId',
    'statusChangeDate',
    'status'];
  dataSource = new MatTableDataSource([]);
  resultsLength = 0;
  isLoadingResults = true;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: RequestService) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.sort?.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      console.log('sort');
    });

  }

  ngOnInit(): void {
    this.service
      .getList()
      .pipe(untilDestroyed(this))
      .subscribe((requestList: RequestModel[]) => {
        this.isLoadingResults = false;
        // @ts-ignore
        this.dataSource = requestList;
        });
  }

  ngOnDestroy(): void {}

}
