import {Component, OnInit} from '@angular/core';
import {IPhysicalLocation, IPhysicalLocationCatalog} from '../../types/request.model';
import {Observable} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PhysicalLocationService} from '../../services/physical-location.service';
import {ActivatedRoute} from "@angular/router";

@UntilDestroy()
@Component({
  selector: 'app-physical-location',
  templateUrl: './physical-location.component.html',
  styleUrls: ['./physical-location.component.scss']
})
export class PhysicalLocationComponent implements OnInit {
  isShowBtn = false;
  isShowForm: boolean = true;
  isDisabledForm: boolean = false;
  physicalLocation: IPhysicalLocation | undefined;
  catalog: Observable<IPhysicalLocationCatalog>
  isReadonly = true;

  constructor(public service: PhysicalLocationService,  private route: ActivatedRoute) {
    this.catalog = this.service.physicalLocationCatalog()
  }


  ngOnInit(): void {
    this.service.physicalLocation$.pipe(untilDestroyed(this))
      .subscribe((val) => this.physicalLocation = val);

    this.service.isReadOnly$.subscribe(res => this.isReadonly = res);
    if(this.route.snapshot.paramMap.get('id') === 'add') {
      this.isShowForm = false;
      this.isShowBtn = true;
    }
  }

  add() {
    this.isShowForm = true;
  }

  save(): void {
    this.isDisabledForm = !this.isDisabledForm;
    this.service.update(this.physicalLocation!!);
  }
}
