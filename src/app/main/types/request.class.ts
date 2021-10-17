import {IRequestModel} from './request.model';
import {RequestGeneralClass} from './requestGeneral.class';
import {PhysicalLocationClass} from './physical-location.class';

export class RequestClass implements IRequestModel{
  id = undefined
  comments = []
  general = new RequestGeneralClass();
  networkConnections = [];
  physicalLocation = new PhysicalLocationClass();
}
