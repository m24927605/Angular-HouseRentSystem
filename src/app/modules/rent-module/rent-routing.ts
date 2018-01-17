import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    ManagerComponent,
    PayFlowComponent,
    RentDetailComponent,
    UserDetailComponent,
    ManagerAddComponent,
    PayFlowAddComponent,
    RentDetailAddComponent,
    UserDetailAddComponent
} from './components/rent.collection';

const routes: Routes = [
    { path: 'manager', component: ManagerComponent },
    { path: 'manager-add', component: ManagerAddComponent },
    { path: 'payflow', component: PayFlowComponent },
    { path: 'payflow-add', component: PayFlowAddComponent },
    { path: 'rentDetail', component: RentDetailComponent },
    { path: 'rentDetail-add', component: RentDetailAddComponent },
    { path: 'userDetail', component: UserDetailComponent },
    { path: 'userDetail-add', component: UserDetailAddComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RentRoutingModule { }
