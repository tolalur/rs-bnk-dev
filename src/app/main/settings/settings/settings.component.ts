import { Component, OnInit } from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {SettingsService} from "../../services/settings.service";

interface settingItem {
  key: string;
  value: string;
}

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  setting = {workHours: ''};
  isManualConfirmation: boolean | undefined;
  isEditedTime = false;
  isEditedAdmin = false;
  time: string | undefined;
  name: string | undefined;
  email: string | undefined;

  constructor(private service: SettingsService) { }

  ngOnInit(): void {
    this.service.getSettings
      .pipe(untilDestroyed(this))
      .subscribe((setting: object[]) => {
        // @ts-ignore
        setting.forEach( (item: settingItem) => {
          console.log(item);
          if( item.key === 'REQUEST_WORK_HOURS' ) {
            this.setting.workHours = item.value;
          }
        });
        console.log(this.setting);
      });
  }

  edit(key: string, value: boolean) {
    // @ts-ignore
    this[key] = value;
  }
}
