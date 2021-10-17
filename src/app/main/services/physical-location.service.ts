import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {IPhysicalLocation, IPhysicalLocationCatalog} from '../types/request.model';
import {UserService} from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PhysicalLocationService {

  constructor(private requestService: RequestService, private userService: UserService) {
  }

  physicalLocation$: Observable<IPhysicalLocation> = this.requestService.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.physicalLocation)
  );

  isReadOnly$ = this.requestService.isReadOnly$

  update(data: IPhysicalLocation) {
    const requestData = this.requestService.requestData;
    if (requestData) {
      this.requestService.changeRequest({
        ...requestData,
        physicalLocation: data
      });
    }
  }

  physicalLocationCatalog(): Observable<IPhysicalLocationCatalog> {
    return of({
      powerPlugConnectorType: [{
        label: 'UTP RJ45',
        value: 'UTP RJ45'
      }],
      dimensionsUnits: [{
        label: '1',
        value: '1'
      },
        {
          label: '2',
          value: '2'
        }]

    });
  }

}
