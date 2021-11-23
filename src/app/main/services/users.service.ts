import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../types/users.model";
import {IRequestDTO} from "../types/request.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = environment.apiPrefix + '/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  setResponsibleUser(id: number) {
    return this.http.post<IRequestDTO>(`${this.usersUrl}/${id}/resp_user`, {respUserId: id});
  }
}
