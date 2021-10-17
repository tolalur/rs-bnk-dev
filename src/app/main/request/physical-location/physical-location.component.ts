import {Component, OnInit} from '@angular/core';
import {IPhysicalLocation} from "../../types/request.model";
import {Observable} from "rxjs";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PhysicalLocationService} from '../../services/physical-location.service';

@UntilDestroy()
@Component({
  selector: 'app-physical-location',
  templateUrl: './physical-location.component.html',
  styleUrls: ['./physical-location.component.scss']
})
export class PhysicalLocationComponent implements OnInit {

  constructor(public service: PhysicalLocationService) {
  }
  isShowForm: boolean = false;
  isDisabledForm: boolean = false;
  physicalLocation$: Observable<IPhysicalLocation> = this.service.physicalLocation$;
  physicalLocation: IPhysicalLocation | undefined;

  units = [
    {
      label: '1',
      value: '1'
    },
    {
      label: '2',
      value: '2'
    }
  ];

  types = [
    {
      label: 'type 1',
      value: 'type 1'
    }
  ];
  ngOnInit(): void {
    // console.log(this.physicalLocation$);
    this.physicalLocation$.pipe(untilDestroyed(this))
      .subscribe((val) => this.physicalLocation = val);
  }

  add() {
    this.isShowForm = true;
  }

  save(): void {
    this.isDisabledForm = !this.isDisabledForm;
  }
}
