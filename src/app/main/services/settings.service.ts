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

  postSetting(key: string, value: string): Observable<any> {

    return this.http.post<any>(this.settingsUrl, {key: key, value: value});
  }

  changeSetting(key: string, value: string): Observable<any> {

    return this.http.put<any>(`${this.settingsUrl}/${key}`, {key: key, value: value});
  }
}
