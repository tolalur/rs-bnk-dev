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
  private catalogMashzalsUrl = environment.apiPrefix + '/dictionary/mashzals';
  constructor(private http: HttpClient) { }


  getListCatalogMashzals(): Observable<CatalogListModel[]> {

    return this.http.get<Response>(this.catalogUrl).pipe(map(value => {
      return value.mashzals;
    }));
  }

  addListCatalogMashzals(name: string): Observable<object> {

    return this.http.post<object>(this.catalogMashzalsUrl, {name: name});
  }

  editListCatalogMashzals(id: string, name: string): Observable<object> {

    return this.http.post<object>(this.catalogMashzalsUrl, {name: name});
  }
}
