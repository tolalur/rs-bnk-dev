import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListComponent } from './request-list/request-list.component';
import {MainRoutingModule} from './main-routing.module';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GeneralComponent } from './request/general/general.component';
import { PositionComponent } from './request/position/position.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RequestComponent} from './request/request/request.component';
import { NetworkConnectionComponent } from './request/network-connection/network-connection.component';
import { PhysicalLocationComponent } from './request/physical-location/physical-location.component';
import { CommentsComponent } from './request/comments/comments.component';
import { CommentComponent } from './request/comments/comment/comment.component';
import { UploadFileModalComponent } from './request/request/upload-file-modal/upload-file-modal.component';



@NgModule({
  declarations: [
    RequestListComponent,
    RequestComponent,
    GeneralComponent,
    PositionComponent,
    NetworkConnectionComponent,
    PhysicalLocationComponent,
    CommentsComponent,
    CommentComponent,
    UploadFileModalComponent
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
