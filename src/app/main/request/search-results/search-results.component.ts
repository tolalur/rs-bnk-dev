import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {ISearchResults, ISearchResultsVariants, RequestModelStatusEnum} from '../../types/request.model';
import {MatDialog} from '@angular/material/dialog';
import {SearchResultsEditComponent} from '../search-results-edit/search-results-edit.component';
import {filter, map, tap} from 'rxjs/operators';
import {UserService} from '../../../user/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  displayedColumns = [
    'number',
    'engineRoom',
    'placeNumber',
    'place',
    'networkConnections'
  ];
  selectedRow: ISearchResults | undefined;
  selectedRowIndex: number | undefined;

  dataSource = {} as ISearchResults;
  dataTableSource = [] as ISearchResultsVariants[];

  get canClickOnRow(): boolean {
    return !this.userService.isUserNotAdmin &&
      this.service.requestData$.getValue()?.status == RequestModelStatusEnum.INPROCESS;
  }

  constructor(private service: RequestService, public dialog: MatDialog, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const id = this.service.requestData$.getValue()?.id;

    if (id != null) {
      this.service.getSearchResourcesResults(id)
        .pipe(
          filter(val => val != null && val[0] != null),
          map(val => val[0]),
          tap(val => this.dataSource = val)
        )
        .subscribe(
          res => {
            if (this.service.requestData$.getValue()?.status == RequestModelStatusEnum.DONE) {
              this.dataTableSource = res.variants.filter(val => val.status);
            } else {
              this.dataTableSource = res.variants;
            }
          });
    }
  }



  open() {
    console.log(this.selectedRow)
    this.dialog.open(SearchResultsEditComponent, {
      width: '100%',
      maxWidth: '900px',
      data: this.selectedRow
    })
  }

  selectRow(row: ISearchResults, index: number) {
    console.log(row);
    this.selectedRow = row;
    this.selectedRowIndex = index;
  }

  reject() {
    console.log(this.selectedRow?.id);
  }

  new() {
    this.dialog.open(SearchResultsEditComponent, {
      width: '100%',
      maxWidth: '900px',
      data: {}
    })
  }
}
