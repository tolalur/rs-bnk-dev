import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {IPhysicalLocation} from '../types/request.model';
import {UserService} from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PhysicalLocationService {

  constructor(private requestService: RequestService, private userService: UserService) { }

  physicalLocation$: Observable<IPhysicalLocation> = this.requestService.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.physicalLocation)
  );

  update(data: IPhysicalLocation) {
    const requestData = this.requestService.requestData;
    if (requestData) {
      this.requestService.changeRequest({
        ...requestData,
        physicalLocation: data
      })
    }
  }
}
