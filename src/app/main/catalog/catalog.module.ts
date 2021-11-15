import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { AddToCatalogModalComponent } from './add-to-catalog-modal/add-to-catalog-modal.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CatalogComponent,
    AddToCatalogModalComponent
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
