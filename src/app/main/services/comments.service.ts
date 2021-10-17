import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {UserService} from '../../user/user.service';
import {IComment} from '../types/request.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private requestService: RequestService, private userService: UserService) {
  }

  comments$: Observable<IComment[]> = this.requestService.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.comments)
  );

  addComment(data: string) {
    const comment: IComment = {
      text: data,
      author: this.userService.user?.name || '',
      date: new Date().toJSON()
    };

    const requestData = this.requestService.requestData;
    if (requestData) {
      this.requestService.changeRequest({
        ...requestData,
        comments: [comment].concat(requestData.comments)
      })
    }
  }
}
