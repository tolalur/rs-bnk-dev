import {IComment, IRequestDTO, IRequestPosition, RequestModelStatusEnum} from './request.model';
import {RequestPositionClass} from './requestPosition.class';


export class RequestClass implements IRequestDTO {
  projectNumber = '';
  serviceOwner = '';
  adminGroup = '';
  correctionBudgetLink = '';

  positions: IRequestPosition[] = [new RequestPositionClass()];
}
