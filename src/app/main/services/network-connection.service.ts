import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {INetworkConnectionModel, INetworkConnectionModelCatalog, IRequestModel} from '../types/request.model';
import {filter, map, tap} from 'rxjs/operators';
import {RequestService} from './request.service';
import {NetworkConnectionClass} from '../types/network.connection.class';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectionService {
  selectedNetworkConnection: null | INetworkConnectionModel = null;
  private networkConnections: INetworkConnectionModel[] | null = null;

  constructor(private requestService: RequestService) {
  }

  networkConnection$: Observable<INetworkConnectionModel[]> = this.requestService.requestData$.pipe(
    filter(val => val != null),
    tap(val => this.networkConnections = val!!.networkConnections),
    map(val => val!!.networkConnections)
  );

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

  copyNetworkConnection(i: number) {
    if (this.networkConnections) {
      this.networkConnections.push(this.networkConnections[i]);
      this.update(this.networkConnections.slice());
    }
  }

  OnDeleteNetworkConnection(i: number) {
    if (this.networkConnections) {
      this.networkConnections.splice(i, 1);
      this.update(this.networkConnections.slice());
    }
  }

  onEditNetworkConnection(i: number) {
    if (this.networkConnections) {
      this.selectedNetworkConnection = {...this.networkConnections[i]};
    }
  }

  onAddNetworkConnection() {
    this.selectedNetworkConnection = new NetworkConnectionClass();
  }

  saveNetworkConnection(index?: number) {
    if (this.networkConnections && this.selectedNetworkConnection) {

      if (index != null) {
        this.networkConnections[index] = this.selectedNetworkConnection;
      } else {
        this.networkConnections.push(this.selectedNetworkConnection);
      }

      this.update(this.networkConnections.slice());
      this.selectedNetworkConnection = null;
    }
  }

  private update(data: INetworkConnectionModel[]) {
    const requestData = this.requestService.requestData;
    if (requestData) {
      this.requestService.changeRequest({
        ...requestData,
        networkConnections: data
      });
    }
  }
}
