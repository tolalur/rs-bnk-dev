import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListComponent } from './request-list/request-list.component';
import {MainRoutingModule} from './main-routing.module';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { GeneralComponent } from './request/general/general.component';
import { PositionComponent } from './request/position/position.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    RequestListComponent,
    RequestComponent,
    GeneralComponent,
    PositionComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class MainModule { }
