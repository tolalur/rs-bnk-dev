import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsUrl = environment.apiPrefix + '/settings';

  constructor(private http: HttpClient) { }

  get getSettings(): Observable<any> {

    return this.http.get<any>(this.settingsUrl);
  }
}
