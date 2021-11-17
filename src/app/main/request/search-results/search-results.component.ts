import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ISearchResults} from '../../types/request.model';
import {MatDialog} from '@angular/material/dialog';
import {SearchResultsEditComponent} from '../search-results-edit/search-results-edit.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  data$: Observable<ISearchResults[] | undefined>;

  displayedColumns = [
    'number',
    'engineRoom',
    'placeNumber',
    'place',
    'networkConnections',
  ];
  selectedRow: ISearchResults | undefined;
  selectedRowIndex: number | undefined;

  dataSource = []

  constructor(private service: RequestService, public dialog: MatDialog) {
    this.data$ = this.service.requestData$.pipe(
      map(val => []),
      filter(val => val != null),
      // @ts-ignore
      tap(val => (this.dataSource = val ?? []) )
    );
  }

  ngOnInit(): void {
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
