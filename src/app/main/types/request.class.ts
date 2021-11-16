import {IRequestDTO, RequestModelStatusEnum} from './request.model';
import {PhysicalLocationClass} from './physical-location.class';


export class RequestClass implements IRequestDTO{
  id = undefined
  comments = []
  projectNumber = '';
  serviceOwner = '';
  adminGroup = '';
  mnemonicMachineName = '';
  correctionBudgetLink = '';
  networkConnections = [];
  physicalLocation = new PhysicalLocationClass();
  createdAt = '';
  positions = [];
  status = RequestModelStatusEnum.NEW;
  updatedAt = '';
  user = '';
}
