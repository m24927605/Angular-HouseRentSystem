import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { NotFoundComponent } from '../../shared/components/collection';

const routes: Routes = [
    {
        path: '', component: PageComponent
    },
    {
        path: 'rent', component: PageComponent,
        loadChildren: 'app/modules/rent-module/rent-module#RentModule'
    },
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PageRoutingModule { }