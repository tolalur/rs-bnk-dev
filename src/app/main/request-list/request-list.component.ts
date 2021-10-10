import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RequestService} from "../request.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { switchMap } from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {RequestListModel} from '../types/request-list.model';


@UntilDestroy()
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements AfterViewInit, OnInit {
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
  isLoadingResults = false;
  selectedStatus = '';
  sortBy = 'creationDate';
  sortDir = 'asc';

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: RequestService) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.sort?.sortChange
      .pipe(
        // @ts-ignore

        switchMap(val => {
          this.sortBy = val.active === 'active' ? 'isActive' : val.active;
          this.sortDir = val.direction;
          this.isLoadingResults = true;

          return this.service.getListRequest(this.sortBy, this.sortDir);
        }),
          untilDestroyed(this)
    )
      .subscribe(res => {
        this.paginator.pageIndex = 0;

        // @ts-ignore
        this.dataSource = res;
        this.isLoadingResults = false;
      });



  }

  ngOnInit(): void {
    this.service
      .getListRequest(this.sortBy, this.sortDir)
      .pipe(untilDestroyed(this))
      .subscribe((requestList: RequestListModel[]) => {
        this.isLoadingResults = false;
        // @ts-ignore
        this.dataSource = requestList;
        });
  }

  StatusChanged() {
    this.isLoadingResults = true;
    console.log('selectedStatus: ', this.selectedStatus);
    this.service.getFilterRequest(this.selectedStatus)
      .pipe(untilDestroyed(this))
      .subscribe((requestList: RequestListModel[]) => {
        this.isLoadingResults = false;
        // @ts-ignore
        this.dataSource = requestList;
      });
  }
}
