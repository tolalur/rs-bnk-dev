import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../request.service';
import {untilDestroyed} from '@ngneat/until-destroy';
import {INetworkConnectionModelCatalog} from '../../types/request.model';
import {RequestWithServiceComponent} from '../request-with-service/request-with-service.component';


@Component({
  selector: 'app-network-connection',
  templateUrl: './network-connection.component.html',
  styleUrls: ['./network-connection.component.scss']
})
export class NetworkConnectionComponent extends RequestWithServiceComponent implements OnInit {
  displayedColumns: string[] = ['segment', 'type', 'speed', 'quantity', 'edit'];

  selectedIndex: number | undefined;
  filters: INetworkConnectionModelCatalog | undefined;

  constructor(public service: RequestService) {
    super(service);
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
    this.service.editNetworkConnection(index);
  }

  delete(index: number) {
    this.service.deleteNetworkConnection(index);
  }

  save() {
    this.service.saveNetworkConnection(this.selectedIndex);
  }

  add() {
    this.selectedIndex = undefined;
    this.service.addNetworkConnection();
  }
}