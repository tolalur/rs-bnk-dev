import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AdminMenuComponent} from "./admin-menu/admin-menu.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import {AuthInterceptor} from '../_interceptors/auth-interceptor';
import {ErrorInterceptor} from '../_interceptors/error-interceptor';
import {DataInterceptor} from '../_interceptors/data-interceptor';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    AdminMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
