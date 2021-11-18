import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UntilDestroy} from '@ngneat/until-destroy';
import {INetworkConnectionModel} from '../../types/request.model';
import {DictionariesService} from '../../services/dictionaries.service';
import {RequestService} from '../../services/request.service';
import {NetworkConnectionClass} from '../../types/network.connection.class';

@UntilDestroy()
@Component({
  selector: 'app-network-connection',
  templateUrl: './network-connection.component.html',
  styleUrls: ['./network-connection.component.scss']
})
export class NetworkConnectionComponent implements OnInit {
  private _networkConnections = [] as INetworkConnectionModel[];
  get networkConnections(): INetworkConnectionModel[] {
    return this._networkConnections;
  }

  @Input() set networkConnections(value: INetworkConnectionModel[] | undefined) {
    if (value) {
      this._networkConnections = value;
      this.mapNetworkConnectionsToDataSource(value);
    }
  }

  selectedNetworkConnection: INetworkConnectionModel | null = null;

  displayedColumns: string[] = ['segment', 'type', 'speed', 'quantity', 'edit'];

  selectedIndex: number | null = null;
  isReadonly = true;

  dataSource = [] as INetworkConnectionModel[];

  constructor(public service: RequestService, public dictionaryService: DictionariesService) {
    this.service.isReadOnly$.subscribe(res => this.isReadonly = res);
  }

  ngOnInit(): void {
  }

  copy(index: number) {
    const item = {...this.networkConnections[index]};
    this.networkConnections.push(item);
    this.mapNetworkConnectionsToDataSource(this.networkConnections);
  }

  edit(index: number) {
    this.selectedNetworkConnection = this.networkConnections[index];
    this.selectedIndex = index;
  }

  delete(index: number) {
    this.networkConnections.splice(index, 1);
    this.mapNetworkConnectionsToDataSource(this.networkConnections);
  }

  save() {
    if (this.selectedNetworkConnection) {
      if (this.selectedIndex != null) {
        this.networkConnections[this.selectedIndex] = this.selectedNetworkConnection;
      } else {
        this.networkConnections.push(this.selectedNetworkConnection)
      }
    }

    this.selectedNetworkConnection = null;
    this.selectedIndex = null;

    this.mapNetworkConnectionsToDataSource(this.networkConnections);
  }

  add() {
    this.selectedNetworkConnection = new NetworkConnectionClass();
  }

  mapNetworkConnectionsToDataSource(value: INetworkConnectionModel[]) {
    const dictionary = this.dictionaryService.dictionary$.getValue();

    this.dataSource = value.map<INetworkConnectionModel>(val => ({
      connSpeed: dictionary?.connSpeeds.find(item => item.id == Number(val.connSpeed))?.name || val.connSpeed,
      connType: dictionary?.connTypes.find(item => item.id == Number(val.connType))?.name || val.connType,
      segment: dictionary?.segments.find(item => item.id == Number(val.segment))?.name || val.segment,
      amountPort: val.amountPort
    }));
  }
}
