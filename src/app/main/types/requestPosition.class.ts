import {INetworkConnectionModel, IRequestPosition, RequestPositionTypeEnum} from './request.model';

export class RequestPositionClass implements IRequestPosition {
  mashzal = '';
  placementId = 0;
  electricityConnectorType = '';
  networkConnections: INetworkConnectionModel[] = [];
  machineModel = '';
  amountUnit = 0;
  depth = 0;
  serialNumber = '';
  inventoryNumber = '';
  amountPhases = 0;
  amountConnection = 0;
  type = RequestPositionTypeEnum.NEW_SETUP;
  mnemonicMachineName = '';
}

