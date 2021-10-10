import {Injectable} from '@angular/core';
import {MockRequestListService} from '../mock/mock-request-list.service';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {RequestListModel} from './types/request-list.model';
import {
  INetworkConnectionModel,
  INetworkConnectionModelCatalog,
  IRequestGeneral,
  IRequestModel
} from './types/request.model';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {NetworkConnectionClass} from './types/network.connection.class';
import {RequestClass} from './types/request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  urlList = '';

  private requestData: IRequestModel | null = null;

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
        general: {
          idProject: 'idProject',
          owner: 'owner',
          administratorsGroup: 'administratorsGroup',
          mnemonicName: 'mnemonicName',
          budgetLinks: 'budgetLinks'
        },
        networkConnections: [
          {segment: 'коммутаторы DASW', type: 'UTP RJ45', speed: '100/10', quantity: 2},
          {segment: 'коммутаторы PDSW', type: 'UTP RJ45', speed: '100/10', quantity: 3},
          {segment: 'коммутаторы DASW', type: 'UTP RJ45', speed: '100/10', quantity: 1}
        ],
        physicalLocation: []
      })),
      tap(data => this.requestData = data)
    ).subscribe(data => this.requestData$.next(data));
  }

  addNewRequest() {
    this.requestData = new RequestClass();
    this.requestData$.next(this.requestData);
  }

  copyNetworkConnection(i: number) {
    if (this.requestData?.networkConnections) {
      const networkConnections = this.requestData.networkConnections;
      networkConnections.push(networkConnections[i]);
      this.requestData.networkConnections = networkConnections.slice();

      this.requestData$.next(this.requestData);
    }
  }

  deleteNetworkConnection(i: number) {
    if (this.requestData?.networkConnections) {
      const networkConnections = this.requestData.networkConnections;
      networkConnections.splice(i, 1);
      this.requestData.networkConnections = networkConnections.slice();

      this.requestData$.next(this.requestData);
    }
  }

  editNetworkConnection(i: number) {
    if (this.requestData?.networkConnections) {
      this.selectedNetworkConnection = {...this.requestData.networkConnections[i]};
    }
  }

  addNetworkConnection() {
    this.selectedNetworkConnection = new NetworkConnectionClass();
  }

  saveNetworkConnection(i?: number) {
    if (this.requestData?.networkConnections && this.selectedNetworkConnection) {
      const networkConnections = this.requestData.networkConnections;
      if (i != null) {
        networkConnections[i] = this.selectedNetworkConnection;
      } else {
        networkConnections.push(this.selectedNetworkConnection);
      }

      this.requestData.networkConnections = networkConnections.slice();
      this.requestData$.next(this.requestData);
      this.selectedNetworkConnection = null;
    }
  }
}
