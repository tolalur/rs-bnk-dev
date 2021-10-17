import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ISearchResults} from '../../types/request.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  data$: Observable<ISearchResults | undefined>;

  constructor(private service: RequestService) {
    this.data$ = this.service.requestData$.pipe(
      map(val => val?.searchResults),
      filter(val => val != null)
    );
  }

  ngOnInit(): void {
  }

}
