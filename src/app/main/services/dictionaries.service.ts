import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {IDictionaries} from '../types/request.model';
import {take} from 'rxjs/operators';

const baseUrl = environment.apiPrefix + '/dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {

  dictionary$ = new BehaviorSubject<null | IDictionaries>(null)

  constructor(private http: HttpClient) { }

  getData(): void {
    this.http.get<IDictionaries>(baseUrl).pipe(
      take(1)
    ).subscribe(val => this.dictionary$.next(val))
  }
}
