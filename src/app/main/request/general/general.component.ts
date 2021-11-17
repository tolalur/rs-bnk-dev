import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {IRequestDTO, IRequestGeneral} from '../../types/request.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {RequestService} from '../../services/request.service';
import {filter, throttle, throttleTime} from 'rxjs/operators';


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
    projectNumber: new FormControl(null),
    serviceOwner: new FormControl(null),
    adminGroup: new FormControl(null),
    correctionBudgetLink: new FormControl(null)
  } as GeneralControls) as GeneralFormGroup;

  isReadonly = true;

  constructor(private service: RequestService) {
  }

  ngOnInit(): void {
    this.service.requestData$
      .pipe(
        filter(val => val !== null),
        throttleTime(500),
        untilDestroyed(this)
      )
      .subscribe(data => {
        Object.keys(this.generalForm.value).forEach(key => {
          // @ts-ignore
          this.generalForm.controls[key].patchValue(data[key]);
        });
      });

    this.service.isReadOnly$.subscribe(res => {
      if (res) this.generalForm.disable();
    });

    this.generalForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.service.changeRequest({
          ...this.service.requestData$.getValue(),
          ...this.generalForm.value
        })

      });
  }

}
