import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {IRequestDTO} from '../types/request.model';
import {RequestListModel} from '../types/request-list.model';
import {RequestClass} from '../types/request.class';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../../user/user.service';

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

  isReadOnly$: Observable<boolean> = new BehaviorSubject<boolean>(!this.userService.isUserNotAdmin)

  constructor(private http: HttpClient, private userService: UserService) {
    this.isReadOnly$.subscribe(console.log)
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
}
