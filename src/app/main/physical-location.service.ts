import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {IPhysicalLocation} from './types/request.model';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhysicalLocationService {

  constructor(private requestService: RequestService) { }

  physicalLocation$: Observable<IPhysicalLocation> = this.requestService.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.physicalLocation)
  );
}
