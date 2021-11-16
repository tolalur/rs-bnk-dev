import {
  INetworkConnectionModel,
  IPhysicalLocation,
  IRequestDTO,
  IRequestGeneral,
  IRequestPosition
} from '../types/request.model';

export const toRequestGeneralMapper = ({
                                         projectNumber,
                                         serviceOwner,
                                         adminGroup,
                                         mnemonicMachineName,
                                         correctionBudgetLink
                                       }: IRequestDTO): IRequestGeneral => ({
  projectNumber, serviceOwner, adminGroup, mnemonicMachineName, correctionBudgetLink
});

export const toPhysicalLocationMapper = ({
                                           machineModel,
                                           amountUnit,
                                           depth,
                                           serialNumber,
                                           inventoryNumber,
                                           amountPhases,
                                           amountConnection,
                                           type,
                                           mashzal,
                                           placementId,
                                           electricityConnectorType
                                         }: IRequestPosition): IPhysicalLocation => ({
  machineModel,
  amountUnit,
  depth,
  serialNumber,
  inventoryNumber,
  amountPhases,
  amountConnection,
  type,
  mashzal,
  placementId,
  electricityConnectorType
});


export const toNetworkConnectionMapper = ({
                                           machineModel,
                                           amountUnit,
                                           depth,
                                           serialNumber,
                                           inventoryNumber,
                                           amountPhases,
                                           amountConnection,
                                           type,
                                           mashzal,
                                           placementId,
                                           electricityConnectorType
                                         }: IRequestPosition): IPhysicalLocation => ({
  machineModel,
  amountUnit,
  depth,
  serialNumber,
  inventoryNumber,
  amountPhases,
  amountConnection,
  type,
  mashzal,
  placementId,
  electricityConnectorType
});
