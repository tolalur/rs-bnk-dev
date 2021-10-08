import { Component, OnInit } from '@angular/core';

export interface networkConnectionsItem {
  segment: string;
  type: string;
  speed: string;
  quantity: number;
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  networkConnections = [
    {segment: 'коммутаторы DASW', type: 'UTP RJ45', speed: '100/10', quantity: 2},
    {segment: 'коммутаторы PDSW', type: 'UTP RJ45', speed: '100/10', quantity: 3},
    {segment: 'коммутаторы DASW', type: 'UTP RJ45', speed: '100/10', quantity: 2},
  ];
  displayedColumns: string[] = ['segment', 'type', 'speed', 'quantity'];
  constructor() { }

  ngOnInit(): void {
  }

}
