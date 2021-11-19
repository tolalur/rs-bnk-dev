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
  isEditedTime = false;
  isEditedAdmin = false;

  isSettingManualConfirmationNew: boolean | undefined;
  isSettingTimeNew = true;
  isSettingNetAdminNew = true;

  isManualConfirmation = false;
  time: string | undefined;
  netAdmin: string | undefined;

  constructor(private service: SettingsService) { }

  ngOnInit(): void {
    this.service.getSettings
      .pipe(untilDestroyed(this))
      .subscribe((setting: object[]) => {
        // @ts-ignore
        setting.forEach( (item: settingItem) => {
          console.log(item);
          if( item.key === 'REQUEST_WORK_HOURS' ) {
            this.time = item.value;
            if (this.time) {
              this.isSettingTimeNew = false;
            }
          }
          if( item.key === 'netAdmin') {
            this.netAdmin = item.value;
            if (this.netAdmin) {
              this.isSettingNetAdminNew = false;
            }
          }
          if ( item.key === 'ManualConfirmation') {
            this.isSettingManualConfirmationNew = false;
            this.isManualConfirmation = item.value === 'true';
          }
        });

      });
  }

  edit(key: string, value: boolean) {
    // @ts-ignore
    this[key] = value;
  }

  changeTime() {
    if (this.time && !this.isSettingTimeNew) {
      this.service.changeSetting('REQUEST_WORK_HOURS', this.time)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    } else if (this.time && this.isSettingTimeNew) {
      this.service.postSetting('REQUEST_WORK_HOURS', this.time)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    }
  }

  changeNetAdmin() {
    if (this.netAdmin && !this.isSettingNetAdminNew) {
      this.service.changeSetting('netAdmin', this.netAdmin)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    } else if (this.netAdmin && this.isSettingNetAdminNew) {
      this.service.postSetting('netAdmin', this.netAdmin)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    }
  }

  changeManualConfirmation() {
    if (this.isSettingManualConfirmationNew) {
      this.service.postSetting('ManualConfirmation', this.isManualConfirmation.toString())
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    } else {
      this.service.changeSetting('ManualConfirmation', this.isManualConfirmation.toString())
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    }
  }
}
