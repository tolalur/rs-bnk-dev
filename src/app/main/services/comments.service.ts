import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {UserService} from '../../user/user.service';
import {IComment} from '../types/request.model';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentUrl = environment.apiPrefix + '/request';

  constructor(private requestService: RequestService, private userService: UserService, private http: HttpClient) {
  }

  getComment(id: string): Observable<IComment[]>  {
    return this.http.get<IComment[]>(`${this.commentUrl}/${id}/comment`);
  }

  addComment(id: string, data: string) {
    return this.http.post(`${this.commentUrl}/${id}/comment`, {body: data});
  }
}
