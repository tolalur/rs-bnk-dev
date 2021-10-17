import { Component, OnInit } from '@angular/core';
import {UntilDestroy} from '@ngneat/until-destroy';
import {RequestService} from '../../services/request.service';

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
