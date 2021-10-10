import {Component, OnInit} from '@angular/core';
import {PhysicalLocationService} from '../../physical-location.service';

@Component({
  selector: 'app-physical-location',
  templateUrl: './physical-location.component.html',
  styleUrls: ['./physical-location.component.scss']
})
export class PhysicalLocationComponent implements OnInit {
  displayedColumns: string[] = [
    'equipmentModel',
    'dimensions',
    'depth',
    'serialNumber',
    'inventoryNumber',
    'numberOfPhases',
    'numberOfConnections',
    'powerPlugConnectorType'
  ];

  constructor(public service: PhysicalLocationService) {
  }

  physicalLocation$ = this.service.physicalLocation$;

  ngOnInit(): void {
  }

  add() {

  }

  delete(i: number) {

  }

  edit(i: number) {

  }

  copy(i: number) {

  }
}
