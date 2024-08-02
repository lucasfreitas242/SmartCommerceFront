import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Importar MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Importar MatPaginatorModule
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuyerRegisterComponent } from './buyer-register/buyer-register.component';
import { BuyerFilterComponent } from './buyer-filter/buyer-filter.component';
import { BuyerEditComponent } from './buyer-edit/buyer-edit.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BuyerListComponent,
    HomeComponent,
    BuyerRegisterComponent,
    BuyerFilterComponent,
    BuyerEditComponent
  ],
  imports: [
    NgxMaskDirective,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule, 
    MatSidenavModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask({ /* opções de cfg */ })],
  bootstrap: [AppComponent]
})
export class AppModule { }
