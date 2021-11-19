import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {IRequestDTO, IRequestPosition, ISearchResults, RequestModelStatusEnum} from '../types/request.model';
import {RequestListModel} from '../types/request-list.model';
import {RequestClass} from '../types/request.class';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../../user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {WarningModalComponent} from '../request/warning-modal/warning-modal.component';
import {UserRolesEnum} from '../../user/types/user.model';

const baseUrl = environment.apiPrefix + '/request';
const editUrl = (id: number) => `${baseUrl}/${id}`;
const searchResourcesUrl = (id: number) => `${baseUrl}/${id}/search-resources`;
const searchResourcesResultsUrl = (id: number) => `${baseUrl}/${id}/results`;
const rejectUrl = (id: number) => `${baseUrl}/${id}/reject`;
const completeUrl = (id: number) => `${baseUrl}/${id}/complete`;
const approveUrl = (id: number) => `${baseUrl}/${id}/approve`;

const listUrl = baseUrl + '/list';
const itemUrl = (id: number) => `${baseUrl}/${id}`;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _requestData: IRequestDTO | null = null;

  get requestData() {
    return this._requestData;
  }

  isAdd() {
    return this._requestData?.id == null;
  }

  requestData$ = new BehaviorSubject<null | IRequestDTO>(null);

  dataValidationErrors: string[] = [];

  canSearch$ = this.requestData$.pipe(map(val => val?.id != null && val.status == RequestModelStatusEnum.NEW));

  disableAdminBtn$ = this.requestData$.pipe(
    map(val => val?.status == RequestModelStatusEnum.WAITING),
  );

  canSave$ = this.requestData$.pipe(
    map(val => val?.status == RequestModelStatusEnum.NEW || val?.status == undefined)
  );

  isReadOnly$: Observable<boolean> = this.userService.user$.pipe(
    map(user => {
      const request = this.requestData$.getValue();

      return user == null
        || !(user.roles[0].name == UserRolesEnum.USER)
        || request?.status == RequestModelStatusEnum.WAITING
        || request?.status == RequestModelStatusEnum.INPROCESS
        || request?.status == RequestModelStatusEnum.REJECTED
        || request?.status == RequestModelStatusEnum.DONE;
    })
  );

  isDataValid$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private userService: UserService, public dialog: MatDialog) {
  }


  getListRequest(): Observable<RequestListModel[]> {
    return this.http.get<RequestListModel[]>(listUrl);
  }

  getFilterRequest(status: string): Observable<any> {
    return of([]);
    // return this.http.getFilter(status);
  }

  getRequestData(id: number): void {
    this.http.get<IRequestDTO>(itemUrl(id)).pipe(
      map(item => ({...item, comments: item.comments != null ? item.comments : []})),
      tap(data => this._requestData = data),
      tap(data => this.requestData$.next(data)),
      take(1)
    ).subscribe();
  }

  addNewRequest() {
    this._requestData = new RequestClass();
    this.requestData$.next(this._requestData);
  }

  changeRequest(data: IRequestDTO) {
    this._requestData = data;
    this.requestData$.next(this._requestData);
  }

  saveRequest() {
    console.log(JSON.stringify(this.requestData$.getValue()));
    const id = this.requestData$.getValue()?.id;

    if (id != null) {
      return this.http.put<IRequestDTO>(editUrl(id), this.requestData$.getValue());
    }

    return this.http.post<IRequestDTO>(baseUrl, this.requestData$.getValue());
  }

  setResponsible(requestId: string, userId:string) {
    return this.http.post<IRequestDTO>(`${baseUrl}/${requestId}/resp_user`, {respUserId: userId});
  }

  reject(id: number) {
    return this.http.post(rejectUrl(id), {});
  }

  complete(id: number) {
    return this.http.post(completeUrl(id), {});
  }

  approve(id: number) {
    return this.http.put(approveUrl(id), {})
  }

  searchResources(id: number) {
    return this.http.get(searchResourcesUrl(id));
  }

  getSearchResourcesResults(id: number) {
    return this.http.get<ISearchResults[]>(searchResourcesResultsUrl(id));
  }

  validateData() {
    const data = this.requestData$.getValue();
    if (data) {
      this.isDataValid$.next(
        this.dataValidatorPhases(data.positions)
      );
    }
  }

  // если выбрано трехфазное подключение
  private dataValidatorPhases(data: IRequestPosition[]): boolean {
    const isValid = data.every(item => +item.electricityConnectorType != 2);

    if (!isValid) {
      this.dataValidationErrors.push('Для обеспечения требуемого подключения требуется связаться с администраторами по электронной почте');
      this.dialog.open(WarningModalComponent, {
        width: '400px',
        data: this.dataValidationErrors
      });
    }

    return isValid;
  }
}
