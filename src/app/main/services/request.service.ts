import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {MockRequestListService} from '../../mock/mock-request-list.service';
import {IRequestModel} from '../types/request.model';
import {RequestListModel} from '../types/request-list.model';
import {RequestClass} from '../types/request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _requestData: IRequestModel | null = null;

  get requestData() {
    return this._requestData;
  }

  isAdd() {
    return this._requestData?.id == null;
  }

  requestData$ = new BehaviorSubject<null | IRequestModel>(null);

  isReadOnly$ = this.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.id != null),
  );

  constructor(private http: MockRequestListService) {
  }

  getListRequest(sortBy: string, sortDir: string): Observable<RequestListModel[]> {

    console.log('sortBy: ' + sortBy + '; sortDir: ' + sortDir);

    return this.http.getAll();
  }

  getFilterRequest(status: string): Observable<RequestListModel[]> {
    return this.http.getFilter(status);
  }

  getRequestData(id: number): void {
    timer(1000).pipe(
      switchMap(() => of({
        id: id,
        comments: [
          {
            date: 'Mon Oct 11 2021 16:56:55 GMT+0300 (Москва, стандартное время)',
            author: 'Иванов Олег',
            text: 'Прошу добавить в заявку еще 2 порта UTP RJ45 '
          },
          {
            date: 'Wed Mar 02 2011 00:00:00 GMT+0300 (Москва, стандартное время)',
            author: 'Администратор',
            text: 'Для резервирования был изменен номер стойки '
          },
          {
            date: 'Wed Mar 02 2011 00:00:00 GMT+0300 (Москва, стандартное время)',
            author: 'Администратор',
            text: 'Для резервирования был изменен номер стойки. Для резервирования \n' +
              'был изменен номер стойки. Для резервирования был изменен номер\n' +
              'стойки '
          }
        ],
        general: {
          idProject: 'idProject',
          owner: 'owner',
          administratorsGroup: 'administratorsGroup',
          mnemonicName: 'mnemonicName',
          budgetLinks: 'budgetLinks'
        },
        networkConnections: [
          {segment: 'коммутаторы DASW 1', type: 'UTP RJ45', speed: '100/10', quantity: 2},
          {segment: 'коммутаторы PDSW 2', type: 'UTP RJ45', speed: '100/10', quantity: 3},
          {segment: 'коммутаторы DASW 3', type: 'UTP RJ45', speed: '100/10', quantity: 1}
        ],
        physicalLocation: {
          equipmentModel: 'Модель',
          dimensions: '2',
          depth: 3,
          serialNumber: '12345',
          inventoryNumber: '54321',
          numberOfPhases: '3',
          numberOfConnections: '2',
          powerPlugConnectorType: 'UTP RJ45',
        },
        searchResults: {
          physicalLocation: {
            stand: 3232,
            engineRoom: 261,
            placeNumber: 8989
          },
          networkConnections: [
            {segment: 'DASW', port: 'RJ-45-3'},
            {segment: 'PDSW', port: 'UTP'}
          ]
        }
      })),
      map(item => ({...item, comments: item.comments != null ? item.comments : []})),
      tap(data => this._requestData = data)
    ).subscribe(data => this.requestData$.next(data));
  }

  addNewRequest() {
    this._requestData = new RequestClass();
    this.requestData$.next(this._requestData);
  }

  changeRequest(data: IRequestModel) {
    this._requestData = data;
    this.requestData$.next(this._requestData);
  }

  saveRequest() {
    // todo сохранение запроса на бекенде
    console.log(this._requestData);
  }
}
