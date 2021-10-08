import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  @Input() isAdd: boolean | undefined;

  generalForm = new FormGroup({
    idProject: new FormControl(null ),
    owner: new FormControl(null ),
    administratorsGroup: new FormControl(null ),
    mnemonicName: new FormControl(null ),
    budgetLinks: new FormControl(null ),
  });
  constructor() { }

  ngOnInit(): void {
    console.log('isAdd: ', this.isAdd);
  }

}
