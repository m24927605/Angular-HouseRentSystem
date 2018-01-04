import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ManagerComponent, PayFlowComponent, RentDetailComponent, UserDetailComponent } from './components/rent.collection';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.modules';
import { RentRoutingModule } from './rent-routing';

@NgModule({
    imports: [RentRoutingModule, SharedModule],
    exports: [],
    declarations: [ManagerComponent, PayFlowComponent, RentDetailComponent, UserDetailComponent],
})
export class RentModule { }