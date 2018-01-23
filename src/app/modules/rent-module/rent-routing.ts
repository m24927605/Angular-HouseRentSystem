import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    ManagerComponent,
    PayFlowComponent,
    RentDetailComponent,
    UserDetailComponent,
    ManagerActionComponent,
    PayFlowAddComponent,
    RentDetailActionComponent,
    UserDetailActionComponent
} from './components/rent.collection';

const routes: Routes = [
    { path: 'manager', component: ManagerComponent },
    { path: 'manager-action', component: ManagerActionComponent },
    { path: 'payflow', component: PayFlowComponent },
    { path: 'payflow-add', component: PayFlowAddComponent },
    { path: 'rentDetail', component: RentDetailComponent },
    { path: 'rentDetail-action', component: RentDetailActionComponent },
    { path: 'userDetail', component: UserDetailComponent },
    { path: 'userDetail-action', component: UserDetailActionComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RentRoutingModule { }
