import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
// @ts-ignore
import requests from './request-list.json';
import {RequestModel} from "../main/types/request.model";

@Injectable({
  providedIn: 'root'
})
export class MockRequestListService {

  constructor() { }

  getAll(): Observable<RequestModel[]> {
    // @ts-ignore
    return of(requests.list);
  }

  getFilter(status: string) {
    return of(requests.list.filter( (item: RequestModel) => item.status === status));
  }
}
