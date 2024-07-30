import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { BuyerFormComponent } from './buyer-form/buyer-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'buyers', component: BuyerListComponent },
    { path: 'buyers/add', component: BuyerFormComponent },
    // Adicione outras rotas conforme necessário
  ]},
  { path: 'buyers/edit/:id', component: BuyerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
