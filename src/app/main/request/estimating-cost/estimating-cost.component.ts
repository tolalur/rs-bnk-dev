import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ISearchResults} from '../../types/request.model';
import {RequestService} from '../../services/request.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-estimating-cost',
  templateUrl: './estimating-cost.component.html',
  styleUrls: ['./estimating-cost.component.scss']
})
export class EstimatingCostComponent implements OnInit {

  data$: Observable<string | undefined>;

  constructor(private service: RequestService) {
    this.data$ = this.service.requestData$.pipe(
      map(val => val?.cost),
      filter(val => val != null)
    );
  }

  ngOnInit(): void {
  }

}
