import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AdminMenuComponent} from "./admin-menu/admin-menu.component";

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    AdminMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
