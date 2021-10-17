import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {IRequestGeneral} from '../types/request.model';
import {filter, map} from 'rxjs/operators';
import {UserService} from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private requestService: RequestService, private userService: UserService) { }

  general$: Observable<IRequestGeneral> = this.requestService.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.general)
  );

  update(data: IRequestGeneral) {
    const requestData = this.requestService.requestData;
    if (requestData) {
      this.requestService.changeRequest({
        ...requestData,
        general: data
      })
    }
  }
}
