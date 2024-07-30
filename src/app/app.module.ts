import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Importar MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginatorModule
import { MatCheckboxModule } from '@angular/material/checkbox'; // Importar MatCheckboxModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { BuyerFormComponent } from './buyer-form/buyer-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BuyerListComponent,
    BuyerFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule, 
    MatSidenavModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
