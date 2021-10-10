import {IRequestModel} from './request.model';
import {RequestGeneralClass} from './requestGeneral.class';

export class RequestClass implements IRequestModel{
  id = undefined
  general = new RequestGeneralClass();
  networkConnections = [];
  physicalLocation = [];
}
