import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogUrl = environment.apiPrefix + '/dictionary';
  constructor(private http: HttpClient) { }

  // getListRequest(sortBy: string, sortDir: string): Observable<CatalogListModel[]> {
  //
  //   console.log('sortBy: ' + sortBy + '; sortDir: ' + sortDir);
  //   return this.http.post<CatalogListModel[]>(this.catalogUrl);
  //
  //   // return this.http.getAll();
  // }

  getListCatalog(sortBy: string, sortDir: string): any {

    console.log('sortBy: ' + sortBy + '; sortDir: ' + sortDir);
    return this.http.get(this.catalogUrl);
  }
}
