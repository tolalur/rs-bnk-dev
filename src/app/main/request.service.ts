import { Injectable } from '@angular/core';
import {MockRequestListService} from "../mock/mock-request-list.service";
import {RequestModel} from "./types/request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  urlList = '';

  constructor(private http: MockRequestListService) { }

  getListRequest(sortBy: string, sortDir: string): Observable<RequestModel[]> {

    // return this.http.get(this.urlList + `?sortBy=${sortBy}&sortDir=${sortDir}`)
    //   .pipe(
    //     map((data: { corporates: RequestModel[] }) => data.corporates)
    //   );
    console.log('sortBy: ' + sortBy + '; sortDir: ' + sortDir);

    return this.http.getAll();
  }
}
