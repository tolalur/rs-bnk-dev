import {IFilterModel} from './filter.model';

export interface IRequestGeneral {
  projectNumber: string,
  serviceOwner: string,
  adminGroup: string,
  mnemonicMachineName: string,
  correctionBudgetLink: string,
}

export interface INetworkConnectionModel {
  id?: number,
  segment: string,
  connType: string,
  connSpeed: string,
  amountPort: number,
}

// Физическое размещение
// Габариты
// Глубина
// серийный номер
// Инвентарный номер
// Число фаз
// Кол-во подключений
// Тип разъемов вилок электропитания
export interface IPhysicalLocation {
  machineModel: string,
  amountUnit: number,
  depth: number,
  serialNumber: string,
  inventoryNumber: string,
  amountPhases: number,
  amountConnection: number,
  type: string,
  mashzal: string,
  placementId: number,
  electricityConnectorType: string,
}

export interface IPhysicalLocationCatalog {
  powerPlugConnectorType: IFilterModel[],
  dimensionsUnits: IFilterModel[],
}

export interface INetworkConnectionModelCatalog {
  segment: IFilterModel[],
  type: IFilterModel[],
  speed: IFilterModel[],
}

export interface IComment {
  date: string;
  author: string;
  body: string;
}

export interface ISearchResultsPhysicalLocation {
  stand: number;
  engineRoom: number;
  placeNumber: number;
}

export interface ISearchResultsNetworkConnections {
  segment: string;
  port: string;
  quantity: string;
}

export interface ISearchResults {
  physicalLocation: ISearchResultsPhysicalLocation;
  networkConnections: ISearchResultsNetworkConnections;
}

export interface ICost {
  priceKapex: string,
  priceOpex: string
}

export enum RequestModelStatusEnum {
  NEW = 'NEW'
}

export interface IRequestPosition {
  id?: number,
  mashzal: string,
  placementId: number,
  electricityConnectorType: string,
  networkConnections: INetworkConnectionModel[],
  machineModel: string,
  amountUnit: number,
  depth: number,
  serialNumber: string,
  inventoryNumber: string,
  amountPhases: number,
  amountConnection: number,
  type: string
}

export interface IRequestDTO extends IRequestGeneral {
  id?: number;
  comments: IComment[],
  priceOpex?: string,
  priceKapex?: string,
  createdAt: string,
  updatedAt: string,
  maxResponseTime?: string,
  status: RequestModelStatusEnum,
  user: string,
  positions: IRequestPosition[],
  respUserId?: number,
  respUserFio?: string,
  respUserEmail?: string,
}
