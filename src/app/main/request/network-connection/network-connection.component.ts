import {Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {INetworkConnectionModel, INetworkConnectionModelCatalog} from '../../types/request.model';
import {NetworkConnectionService} from '../../services/network-connection.service';
import {Observable} from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-network-connection',
  templateUrl: './network-connection.component.html',
  styleUrls: ['./network-connection.component.scss']
})
export class NetworkConnectionComponent implements OnInit {
  displayedColumns: string[] = ['segment', 'type', 'speed', 'quantity', 'edit'];

  selectedIndex: number | undefined;
  filters: INetworkConnectionModelCatalog | undefined;
  networkConnections$: Observable<INetworkConnectionModel[]>;
  isReadonly = true;

  constructor(public service: NetworkConnectionService) {
    this.networkConnections$ = this.service.networkConnection$;
    this.service.isReadOnly$.subscribe(res => this.isReadonly = res);
  }

  ngOnInit(): void {
    this.service.networkConnectionsCatalog()
      .pipe(untilDestroyed(this))
      .subscribe(res => this.filters = res);
  }

  copy(index: number) {
    this.service.copyNetworkConnection(index);
  }

  edit(index: number) {
    this.selectedIndex = index;
    this.service.onEditNetworkConnection(index);
  }

  delete(index: number) {
    this.service.OnDeleteNetworkConnection(index);
    this.service.selectedNetworkConnection = null;
  }

  save() {
    this.service.saveNetworkConnection(this.selectedIndex);
  }

  add() {
    this.selectedIndex = undefined;
    this.service.onAddNetworkConnection();
  }
}
