import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ISearchResults} from '../../types/request.model';
import {MatTableDataSource} from '@angular/material/table';
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

  dataSource = []

  constructor(private service: RequestService, public dialog: MatDialog) {
    this.data$ = this.service.requestData$.pipe(
      map(val => val?.searchResults),
      filter(val => val != null),
      // @ts-ignore
      tap(val => (this.dataSource = val ?? []) )
    );
  }

  ngOnInit(): void {
  }

  open(row: ISearchResults) {
    console.log(row)
    this.dialog.open(SearchResultsEditComponent, {
      width: '100%',
      maxWidth: '900px',
      data: row
    })
  }
}
