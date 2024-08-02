import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { HomeComponent } from './home/home.component';
import { BuyerRegisterComponent } from './buyer-register/buyer-register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'buyers', component: BuyerListComponent },
    { path: 'buyers/add', component: BuyerRegisterComponent },
    // Adicione outras rotas conforme necessário
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
