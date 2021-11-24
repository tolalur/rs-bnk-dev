import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {ISearchResults, ISearchResultsVariants, RequestModelStatusEnum} from '../../types/request.model';
import {MatDialog} from '@angular/material/dialog';
import {SearchResultsEditComponent} from '../search-results-edit/search-results-edit.component';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {UserService} from '../../../user/user.service';
import {DictionariesService} from '../../services/dictionaries.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {SearchResultsService} from '../../services/search-results.service';

@UntilDestroy()
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
  selectedRow: ISearchResultsVariants | undefined;
  selectedRowIndex: number | undefined;

  dataSource = {} as ISearchResults;
  dataTableSource = [] as ISearchResultsVariants[];

  get canClickOnRow(): boolean {
    return !this.userService.isUserNotAdmin &&
      this.requestService.requestData$.getValue()?.status == RequestModelStatusEnum.INPROCESS;
  }

  constructor(
    private requestService: RequestService,
    private service: SearchResultsService,
    public dialog: MatDialog,
    private userService: UserService,
    public dictionaryService: DictionariesService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const id = this.requestService.requestData$.getValue()?.id;
    this.selectedRow = undefined;
    this.selectedRowIndex = undefined;

    if (id != null) {
      this.service.getSearchResourcesResults(id)
        .pipe(
          filter(val => val != null && val[0] != null),
          map(val => val[0]),
          tap(val => this.dataSource = val)
        )
        .subscribe(
          res => {
            if (this.requestService.requestData$.getValue()?.status == RequestModelStatusEnum.DONE) {
              this.dataTableSource = res.variants.filter(val => val.status);
            } else {
              this.dataTableSource = res.variants;
            }
          });
    }
  }

  edit() {
    const dialog = this.dialog.open(SearchResultsEditComponent, {
      width: '100%',
      maxWidth: '900px',
      data: {...this.selectedRow}
    });

    dialog.afterClosed()
      .pipe(
        switchMap((res: ISearchResultsVariants) => this.service.edit(res, res.id ?? 0)),
        untilDestroyed(this)
      )
      .subscribe(() => this.getData());
  }

  selectRow(row: ISearchResultsVariants, index: number) {
    this.selectedRow = row;
    this.selectedRowIndex = index;
  }

  approve() {
    if (this.selectedRow?.id) {
      this.service.approveResult(this.selectedRow?.id)
        .pipe(untilDestroyed(this))
        .subscribe(() => this.getData());
    }
  }

  new() {
    const item: ISearchResultsVariants = {
      mashzal: 0,
      stand: '',
      unitFrom: 0,
      unitTo: 0,
      networkConnectionResults: [{
        commutatorName: '',
        commutatorPort: ''
      }]
    };

    const dialog = this.dialog.open(SearchResultsEditComponent, {
      width: '100%',
      maxWidth: '900px',
      data: item
    });

    dialog.afterClosed()
      .pipe(
        switchMap((res: ISearchResultsVariants) => this.service.add(res, this.dataSource.id ?? 0)),
        untilDestroyed(this)
      )
      .subscribe(() => this.getData());
  }
}
