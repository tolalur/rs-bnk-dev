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

  addCatalogMashzal(name: string): Observable<any> {

    return this.http.post<any>(this.catalogMashzalUrl, {name: name});
  }

  editCatalogMashzal(id: string, name: string): Observable<any> {

    return this.http.put<any>(`${this.catalogMashzalUrl}/${id}`, {name: name});
  }

  // deliteCatalogMashzal(id: string, name: string): Observable<object> {
    // return this.http.delete<object>(this.catalogMashzalsUrl, {name: name});
  // }

  addCatalogSegment(name: string): Observable<object> {

    return this.http.post<object>(this.catalogSegmentsUrl, {name: name});
  }

  editCatalogSegment(id: string, name: string): Observable<object> {

    return this.http.put<object>(`${this.catalogSegmentsUrl}/${id}`, {name: name});
  }
}
