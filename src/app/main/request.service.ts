import { Injectable } from '@angular/core';
import {MockRequestListService} from "../mock/mock-request-list.service";
import {RequestModel} from "./types/request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: MockRequestListService) { }

  getList(): Observable<RequestModel[]> {
    return this.http.getAll();
  }
}
