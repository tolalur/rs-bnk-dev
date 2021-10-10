import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../request.service';
import {UntilDestroy} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-request-with-service',
  template: '',
  styles: ['']
})
export class RequestWithServiceComponent implements OnInit {

  constructor(public service: RequestService) { }
  networkConnections$ = this.service.networkConnections$

  ngOnInit(): void {
  }

}
