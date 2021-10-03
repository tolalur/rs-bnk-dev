import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestListComponent} from './request-list/request-list.component';
import {RequestComponent} from './request/request.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: RequestListComponent },
  { path: ':id', component: RequestComponent },
  { path: 'add', component: RequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
