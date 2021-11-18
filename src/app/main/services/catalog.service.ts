import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {CatalogListModel, Response} from "../types/catalog.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogUrl = environment.apiPrefix + '/dictionary';
  private catalogMashzalUrl = environment.apiPrefix + '/dictionary/mashzal';
  private catalogSegmentsUrl = environment.apiPrefix + '/dictionary/segment';
  constructor(private http: HttpClient) { }


  getListCatalogMashzals(): Observable<CatalogListModel[]> {

    return this.http.get<Response>(this.catalogUrl).pipe(map(value => {
      return value.mashzals;
    }));
  }

  getListCatalogSegments(): Observable<CatalogListModel[]> {

    return this.http.get<Response>(this.catalogUrl).pipe(map(value => {
      return value.segments;
    }));
  }

  addCatalogMashzal(name: string, netboxName: string): Observable<any> {

    return this.http.post<any>(this.catalogMashzalUrl, {name: name, netboxName: netboxName});
  }

  editCatalogMashzal(id: string, name: string, netboxName: string): Observable<any> {

    return this.http.put<any>(`${this.catalogMashzalUrl}/${id}`, {name: name, netboxName: netboxName});
  }

  // deliteCatalogMashzal(id: string, name: string): Observable<object> {
    // return this.http.delete<object>(this.catalogMashzalsUrl, {name: name});
  // }

  addCatalogSegment(name: string, netboxName: string): Observable<object> {

    return this.http.post<object>(this.catalogSegmentsUrl, {name: name, netboxName: netboxName});
  }

  editCatalogSegment(id: string, name: string, netboxName: string): Observable<object> {

    return this.http.put<object>(`${this.catalogSegmentsUrl}/${id}`, {name: name, netboxName: netboxName});
  }
}
