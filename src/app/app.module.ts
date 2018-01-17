import { SharedModule } from './shared/shared.modules';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { NgZorroAntdModule, NZ_LOCALE, zhTW } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
//helper層
import {
  CookieHelperService,
  HttpHelperService
} from './shared/helpers/collection';

//services層
import { DataAccessService } from './shared/services/collection';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    NgZorroAntdModule.forRoot(),
    SharedModule
  ],
  providers: [{ provide: NZ_LOCALE, useValue: zhTW }],

})
export class AppModule { }
