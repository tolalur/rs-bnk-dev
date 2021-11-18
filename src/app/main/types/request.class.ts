import {IComment, IRequestDTO, IRequestPosition, RequestModelStatusEnum} from './request.model';
import {RequestPositionClass} from './requestPosition.class';


export class RequestClass implements IRequestDTO {
  comments = [] as IComment[];
  projectNumber = '';
  serviceOwner = '';
  adminGroup = '';
  correctionBudgetLink = '';

  positions: IRequestPosition[] = [new RequestPositionClass()];
  status = RequestModelStatusEnum.NEW;
}
