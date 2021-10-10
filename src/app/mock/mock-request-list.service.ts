import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
// @ts-ignore
import requests from './request-list.json';
import {RequestListModel} from '../main/types/request-list.model';

@Injectable({
  providedIn: 'root'
})
export class MockRequestListService {

  constructor() { }

  getAll(): Observable<RequestListModel[]> {
    // @ts-ignore
    return of(requests.list);
  }

  getFilter(status: string) {
    return of(requests.list.filter( (item: RequestListModel) => item.status === status));
  }
}
