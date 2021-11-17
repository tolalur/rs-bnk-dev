import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ICost} from '../../types/request.model';
import {RequestService} from '../../services/request.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-estimating-cost',
  templateUrl: './estimating-cost.component.html',
  styleUrls: ['./estimating-cost.component.scss']
})
export class EstimatingCostComponent implements OnInit {

  data$: Observable<ICost>;

  constructor(public service: RequestService) {
    this.data$ = this.service.requestData$.pipe(
      map(val => ({priceKapex:  val?.priceKapex ?? '', priceOpex: val?.priceOpex ?? ''}))
    );
  }

  ngOnInit(): void {
  }

}
