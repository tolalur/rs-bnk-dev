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
  isManualConfirmation: boolean | undefined;
  isEditedTime = false;
  isEditedAdmin = false;
  isSettingTimeNew = true;
  isSettingNetAdminNew = true;
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
        });

      });
  }

  edit(key: string, value: boolean) {
    // @ts-ignore
    this[key] = value;
  }

  changeTime() {
    if (this.time && !this.isSettingTimeNew) {
      console.log(this.time);
      this.service.changeSetting('REQUEST_WORK_HOURS', this.time)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    } else if (this.time && this.isSettingTimeNew) {
      console.log(this.time);
      this.service.postSetting('REQUEST_WORK_HOURS', this.time)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    }
  }

  changeNetAdmin() {
    if (this.netAdmin && !this.isSettingNetAdminNew) {
      console.log(this.time);
      this.service.changeSetting('netAdmin', this.netAdmin)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    } else if (this.netAdmin && this.isSettingNetAdminNew) {
      console.log(this.netAdmin);
      this.service.postSetting('netAdmin', this.netAdmin)
        .pipe(untilDestroyed(this))
        .subscribe((value) => {
          console.log(value);
        });
    }
  }
}
