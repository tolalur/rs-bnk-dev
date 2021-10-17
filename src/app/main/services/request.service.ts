import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {MockRequestListService} from '../../mock/mock-request-list.service';
import {
  INetworkConnectionModel,
  INetworkConnectionModelCatalog,
  IRequestGeneral,
  IRequestModel
} from '../types/request.model';
import {RequestListModel} from '../types/request-list.model';
import {PhysicalLocationClass} from '../types/physical-location.class';
import {RequestClass} from '../types/request.class';
import {NetworkConnectionClass} from '../types/network.connection.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _requestData: IRequestModel | null = null;

  get requestData() {
    return this._requestData;
  }

  requestData$ = new BehaviorSubject<null | IRequestModel>(null);

  general$: Observable<IRequestGeneral> = this.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.general)
  );

  networkConnections$: Observable<INetworkConnectionModel[]> = this.requestData$.pipe(
    filter(val => val != null),
    map(val => val!!.networkConnections)
  );

  selectedNetworkConnection: null | INetworkConnectionModel = null;

  constructor(private http: MockRequestListService) {
  }

  getListRequest(sortBy: string, sortDir: string): Observable<RequestListModel[]> {

    console.log('sortBy: ' + sortBy + '; sortDir: ' + sortDir);

    return this.http.getAll();
  }

  getFilterRequest(status: string): Observable<RequestListModel[]> {
    return this.http.getFilter(status);
  }


  networkConnectionsCatalog(): Observable<INetworkConnectionModelCatalog> {
    return of({
      segment: [{
        label: 'Основной серверный сегмент (коммутаторы DASW)',
        value: 'Основной серверный сегмент (коммутаторы DASW)'
      }],
      type: [{
        label: 'UTP RJ45',
        value: 'UTP RJ45'
      }],
      speed: [{
        label: '100/10',
        value: '100/10'
      }]
    });
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
        physicalLocation: new PhysicalLocationClass()
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

  copyNetworkConnection(i: number) {
    if (this._requestData?.networkConnections) {
      const networkConnections = this._requestData.networkConnections;
      networkConnections.push(networkConnections[i]);
      this._requestData.networkConnections = networkConnections.slice();

      this.requestData$.next(this._requestData);
    }
  }

  deleteNetworkConnection(i: number) {
    if (this._requestData?.networkConnections) {
      const networkConnections = this._requestData.networkConnections;
      networkConnections.splice(i, 1);
      this._requestData.networkConnections = networkConnections.slice();

      this.requestData$.next(this._requestData);
    }
  }

  editNetworkConnection(i: number) {
    if (this._requestData?.networkConnections) {
      this.selectedNetworkConnection = {...this._requestData.networkConnections[i]};
    }
  }

  addNetworkConnection() {
    this.selectedNetworkConnection = new NetworkConnectionClass();
  }

  saveNetworkConnection(i?: number) {
    if (this._requestData?.networkConnections && this.selectedNetworkConnection) {
      const networkConnections = this._requestData.networkConnections;
      if (i != null) {
        networkConnections[i] = this.selectedNetworkConnection;
      } else {
        networkConnections.push(this.selectedNetworkConnection);
      }

      this._requestData.networkConnections = networkConnections.slice();
      this.requestData$.next(this._requestData);
      this.selectedNetworkConnection = null;
    }
  }
}