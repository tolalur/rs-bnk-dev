import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {RequestService} from '../../request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  id: null | number = null;

  get isAdd(): boolean {
    return this.id == null;
  }

  constructor(private route: ActivatedRoute, private service: RequestService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(({id}) => Number(id)),
        tap(id => isNaN(id) && this.service.addNewRequest()),
        filter(id => !isNaN(id)),
        tap(id => this.id = id),
      )
      .subscribe(id => this.service.getRequestData(id));
  }
}
