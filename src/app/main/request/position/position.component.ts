import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INetworkConnectionModel} from '../../types/request.model';
import {NetworkConnectionClass} from '../../types/network.connection.class';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
