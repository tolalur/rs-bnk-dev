import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {IRequestDTO, IRequestPosition} from '../types/request.model';
import {RequestListModel} from '../types/request-list.model';
import {RequestClass} from '../types/request.class';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../../user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {WarningModalComponent} from '../request/warning-modal/warning-modal.component';

const baseUrl = environment.apiPrefix + '/request';
const editUrl = (id: number) => `${baseUrl}/${id}`
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

  dataValidationErrors: string[] = []

  isReadOnly$: Observable<boolean> = new BehaviorSubject<boolean>(!this.userService.isUserNotAdmin)

  isDataValid$ = new BehaviorSubject<boolean>(true)

  constructor(private http: HttpClient, private userService: UserService, public dialog: MatDialog) {
  }


  getListRequest(sortBy: string, sortDir: string): Observable<RequestListModel[]> {
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
    console.log(JSON.stringify(this.requestData$.getValue()))
    const id = this.requestData$.getValue()?.id

    if (id != null) {
      return this.http.put(editUrl(id), this.requestData$.getValue())
    }

    return this.http.post(baseUrl, this.requestData$.getValue())
  }

  validateData() {
    const data = this.requestData$.getValue();
    if (data) {
      this.isDataValid$.next(
        this.dataValidatorPhases(data.positions)
      )
    }
  }

  // если выбрано трехфазное подключение
  dataValidatorPhases(data: IRequestPosition[]): boolean {
    const isValid = data.every(item => +item.electricityConnectorType != 2);

    if(!isValid) {
      this.dataValidationErrors.push('Для обеспечения требуемого подключения требуется связаться с администраторами по электронной почте');
      this.dialog.open(WarningModalComponent, {
        width: '400px',
        data: this.dataValidationErrors
      });
    }

    return isValid
  }
}
