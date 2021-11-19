import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {IRequestGeneral} from '../../types/request.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {RequestService} from '../../services/request.service';
import {filter, switchMap, throttleTime} from 'rxjs/operators';
import {pipe, timer} from 'rxjs';


type GeneralControls = { [key in keyof IRequestGeneral]: AbstractControl };
type GeneralFormGroup = FormGroup & { value: IRequestGeneral, controls: GeneralControls };

@UntilDestroy()
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  generalForm = new FormGroup({
    projectNumber: new FormControl(null, [
      Validators.required,
      Validators.maxLength(512)
    ]),
    serviceOwner: new FormControl(null, [
      Validators.required,
      Validators.maxLength(512)
    ]),
    adminGroup: new FormControl(null, [
      Validators.required,
      Validators.maxLength(512)
    ]),
    correctionBudgetLink: new FormControl(null, [
      Validators.required,
      Validators.maxLength(512)
    ])
  } as GeneralControls) as GeneralFormGroup;

  isReadonly = true;

  constructor(public service: RequestService) {
  }

  ngOnInit(): void {
    this.generalForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.service.changeRequest({
          ...this.service.requestData$.getValue(),
          ...this.generalForm.value
        });
      });

    this.service.requestData$
      .pipe(
        filter(val => val !== null),
        throttleTime(500),
        untilDestroyed(this)
      )
      .subscribe(data => {
        Object.keys(this.generalForm.value).forEach(key => {
          // @ts-ignore
          this.generalForm.controls[key].setValue(data[key], { emitEvent: false });
        });
      });

    setTimeout(() => {
      this.service.isReadOnly$
        .pipe(
          filter(val => val),
          untilDestroyed(this)
        )
        .subscribe(res => this.generalForm.disable());
    })
  }
}
