import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class SettingsModule { }
