export interface IRequestGeneral {
  projectNumber: string,
  serviceOwner: string,
  adminGroup: string,
  correctionBudgetLink: string,
}

export interface INetworkConnectionModel {
  id?: number,
  segment: string,
  connType: string,
  connSpeed: string,
  amountPort: number,
}

export interface IComment {
  id?: number,
  createdAt: string;
  user: string;
  body: string;
}

export interface ISearchResultsVariantsNetworkConnectionResults {
  id: number,
  commutatorName: string,
  commutatorPort: number
}

export interface ISearchResultsVariants {
  id: number,
  placementResultId: number,
  mashzal: number,
  stand: string,
  unitFrom: number,
  unitTo: number,
  status: boolean,
  networkConnectionResults: ISearchResultsVariantsNetworkConnectionResults[]
}

export interface ISearchResults {
  id: number,
  status: string,
  positionId: number,
  updatedAt?: string,
  variants: ISearchResultsVariants[]
}

export type ICost = Pick<IRequestDTO, 'priceOpex' | 'priceKapex'>

export enum RequestModelStatusEnum {
  NEW = 'NEW'
}

export enum RequestPositionTypeEnum {
  NEW_SETUP = 'NEW_SETUP', NEW_REPLACE = 'NEW_REPLACE'
}

export type IPhysicalLocation = Omit<IRequestPosition, 'networkConnections'>

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
  type: RequestPositionTypeEnum
  mnemonicMachineName: string
}

export interface IRequestDTO extends IRequestGeneral {
  id?: number;
  comments: IComment[],
  priceOpex?: string,
  priceKapex?: string,
  createdAt?: string,
  updatedAt?: string,
  maxResponseTime?: string,
  status: RequestModelStatusEnum,
  positions: IRequestPosition[],
  user?: string,
  respUserId?: number,
  respUserFio?: string,
  respUserEmail?: string,
}

export interface IDictionary {
  id: number,
  name: string,
}

export interface IDictionaryNetBox extends IDictionary {
  netbox_name: string;
}

export interface IDictionaries {
  connSpeeds: IDictionaryNetBox[],
  connTypes: IDictionaryNetBox[],
  electricityConnectorTypes: IDictionaryNetBox[],
  mashzals: IDictionaryNetBox[],
  resultPositionStatuses: IDictionary[],
  resultRequestStatuses: IDictionary[],
  segments: IDictionaryNetBox[],
  statuses: IDictionary[],
}
