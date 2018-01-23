import { NgZorroAntdModule } from 'ng-zorro-antd';
import {
  ManagerComponent,
  PayFlowComponent,
  RentDetailComponent,
  UserDetailComponent,
  PayFlowAddComponent,
  RentDetailActionComponent,
  UserDetailActionComponent,
  ManagerActionComponent
} from './components/rent.collection';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.modules';
import { RentRoutingModule } from './rent-routing';
import { HttpHelperService } from '../../shared/helpers/http-helper.service';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { DataAccessService } from '../../shared/services/collection';
import { CookieHelperService } from '../../shared/helpers/collection';
import { RentDetailService } from './components/rent-detail/rent-detail.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetailService } from './components/user-detail/user-detail.service';
import { PayFlowService } from './components/pay-flow/pay-flow.service';
import { StatusPipe } from './components/user-detail/user.detail.pipe';
import { ManagerService } from './components/manager/manager.service';
import { RolePipe } from './components/manager/manager.pipe';

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpHelperService(backend, options);
}

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    RentRoutingModule,
    SharedModule],
  exports: [],
  declarations: [
    ManagerComponent,
    PayFlowComponent,
    RentDetailComponent,
    UserDetailComponent,
    PayFlowAddComponent,
    RentDetailActionComponent,
    UserDetailActionComponent,
    ManagerActionComponent,
    StatusPipe,
    RolePipe
  ],
  providers: [{
    provide: HttpHelperService,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions]
  },
    DataAccessService,
    CookieHelperService,
    RentDetailService,
    UserDetailService,
    PayFlowService,
    ManagerService
  ],
})
export class RentModule { }