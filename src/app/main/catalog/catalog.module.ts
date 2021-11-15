import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { AddToCatalogModalComponent } from './add-to-catalog-modal/add-to-catalog-modal.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";
import { EngineRoomComponent } from './engine-room/engine-room.component';
import { SegmentsComponent } from './segments/segments.component';
import { AddSegmentToCatalogModalComponent } from './add-segment-to-catalog-modal/add-segment-to-catalog-modal.component';


@NgModule({
  declarations: [
    CatalogComponent,
    AddToCatalogModalComponent,
    EngineRoomComponent,
    SegmentsComponent,
    AddSegmentToCatalogModalComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MatTableModule,
    MatSortModule,
    MaterialModule,
    FormsModule
  ]
})
export class CatalogModule { }
