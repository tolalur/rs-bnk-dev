import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ISearchResults, ISearchResultsVariants} from '../types/request.model';

const baseUrl = environment.apiPrefix + '/request';
const approveUrl = (id: number) => `${baseUrl}/result/${id}/approve`;
const searchResourcesResultsUrl = (id: number) => `${baseUrl}/${id}/results`;
const searchResourcesUrl = (id: number) => `${baseUrl}/${id}/search-resources`;
const addNew = (id: number) => `${baseUrl}/result/${id}`

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  constructor(private http: HttpClient) { }

  searchResources(id: number) {
    return this.http.get(searchResourcesUrl(id));
  }

  approveResult(id: number) {
    return this.http.put(approveUrl(id), {})
  }

  getSearchResourcesResults(id: number) {
    return this.http.get<ISearchResults[]>(searchResourcesResultsUrl(id));
  }

  add(res: ISearchResultsVariants, id: number) {
    return this.http.post<ISearchResults[]>(addNew(id), res);
  }

  edit(res: ISearchResultsVariants, id: number) {
    return this.http.put<ISearchResults[]>(addNew(id), res);
  }
}
