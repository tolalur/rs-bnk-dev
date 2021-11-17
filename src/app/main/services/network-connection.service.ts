import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {INetworkConnectionModel} from '../types/request.model';
import {RequestService} from './request.service';
import {NetworkConnectionClass} from '../types/network.connection.class';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectionService {
  selectedNetworkConnection: null | INetworkConnectionModel = null;
  private networkConnections: INetworkConnectionModel[] | null = null;

  constructor(private requestService: RequestService, private http: HttpClient) {
  }

  isReadOnly$ = this.requestService.isReadOnly$

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
      this.selectedNetworkConnection = new NetworkConnectionClass();
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
        ...data
      });
    }
  }
}
