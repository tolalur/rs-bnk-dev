import {Component, OnInit} from '@angular/core';
import {IPhysicalLocation, IPhysicalLocationCatalog} from '../../types/request.model';
import {Observable} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PhysicalLocationService} from '../../services/physical-location.service';

@UntilDestroy()
@Component({
  selector: 'app-physical-location',
  templateUrl: './physical-location.component.html',
  styleUrls: ['./physical-location.component.scss']
})
export class PhysicalLocationComponent implements OnInit {
  isShowForm: boolean = false;
  isDisabledForm: boolean = false;
  physicalLocation: IPhysicalLocation | undefined;
  catalog: Observable<IPhysicalLocationCatalog>
  isReadonly = true;

  constructor(public service: PhysicalLocationService) {
    this.catalog = this.service.physicalLocationCatalog()
  }


  ngOnInit(): void {
    this.service.physicalLocation$.pipe(untilDestroyed(this))
      .subscribe((val) => this.physicalLocation = val);

    this.service.isReadOnly$.subscribe(res => this.isReadonly = res);
  }

  add() {
    this.isShowForm = true;
  }

  save(): void {
    this.isDisabledForm = !this.isDisabledForm;
    this.service.update(this.physicalLocation!!);
  }
}
