import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent,PayFlowComponent,RentDetailComponent,UserDetailComponent } from './components/rent.collection';

const routes: Routes = [
    { path: 'manager', component: ManagerComponent },
    { path: 'payflow', component: PayFlowComponent },
    { path: 'rentDetail', component: RentDetailComponent },
    { path: 'userDetail', component: UserDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RentRoutingModule { }
