import {Component, Input, OnInit} from '@angular/core';
import {IPhysicalLocation} from '../../types/request.model';
import {UntilDestroy} from '@ngneat/until-destroy';
import {ActivatedRoute} from '@angular/router';
import {DictionariesService} from '../../services/dictionaries.service';
import {RequestService} from '../../services/request.service';
import {WarningModalComponent} from '../warning-modal/warning-modal.component';
import {MatDialog} from '@angular/material/dialog';

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
  isReadonly = true;
  amountPhases = [1, 2, 4, 6];
  amountUnit = Array(28).fill(null).map((item, index) => index + 1)

  @Input() physicalLocation: IPhysicalLocation | undefined;

  constructor(public service: RequestService,
              private route: ActivatedRoute,
              public dictionaryService: DictionariesService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.service.isReadOnly$.subscribe(res => this.isReadonly = res);
    if (this.route.snapshot.paramMap.get('id') === 'add') {
      this.isShowForm = false;
      this.isShowBtn = true;
    }
  }

  add() {
    this.isShowForm = true;
  }

  save(): void {
    this.isDisabledForm = !this.isDisabledForm;
  }
}
