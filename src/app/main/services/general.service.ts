import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {IRequestGeneral} from '../types/request.model';
import {filter, map} from 'rxjs/operators';
import {toRequestGeneralMapper} from '../mappers';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private requestService: RequestService) { }

  general$: Observable<IRequestGeneral> = this.requestService.requestData$.pipe(
    filter(val => val != null),
    map(val => toRequestGeneralMapper(val!!))
  );

  isReadOnly$ = this.requestService.isReadOnly$

  update(data: IRequestGeneral) {
    const requestData = this.requestService.requestData;
    if (requestData) {
      this.requestService.changeRequest({
        ...requestData,
        ...data
      })
    }
  }
}
