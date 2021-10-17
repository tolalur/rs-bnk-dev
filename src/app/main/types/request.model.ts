import {IFilterModel} from './filter.model';

export interface IRequestGeneral {
  idProject: string;
  owner: string;
  administratorsGroup: string;
  mnemonicName: string;
  budgetLinks: string;
}

export interface INetworkConnectionModel {
  segment: string,
  type: string,
  speed: string,
  quantity: number,
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
  equipmentModel: string,
  dimensions: string,
  depth: number,
  serialNumber: string,
  inventoryNumber: string,
  numberOfPhases: string,
  numberOfConnections: string,
  powerPlugConnectorType: string,
}

export interface INetworkConnectionModelCatalog {
  segment: IFilterModel[],
  type: IFilterModel[],
  speed: IFilterModel[],
}

export interface IComment {
  date: string;
  author: string;
  text: string;
}

export interface IRequestModel {
  id?: number;
  comments: IComment[],
  general: IRequestGeneral;
  networkConnections: INetworkConnectionModel[];
  physicalLocation: IPhysicalLocation;
}
