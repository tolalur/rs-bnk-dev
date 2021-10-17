import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../services/general.service';
import {IRequestGeneral} from '../../types/request.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';


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
    idProject: new FormControl(null ),
    owner: new FormControl(null ),
    administratorsGroup: new FormControl(null ),
    mnemonicName: new FormControl(null ),
    budgetLinks: new FormControl(null ),
  } as GeneralControls) as GeneralFormGroup;

  isReadonly = true;

  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    this.service.general$
      .pipe(untilDestroyed(this))
      .subscribe(generalData => {
      Object.keys(generalData).forEach(key => {
        // @ts-ignore
        this.generalForm.controls[key].patchValue(generalData[key])
      })
    });

    this.service.isReadOnly$.subscribe(res => {
      if(res) this.generalForm.disable()
    });
  }

}
