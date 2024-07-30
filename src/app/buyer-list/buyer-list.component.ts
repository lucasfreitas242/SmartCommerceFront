import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from '../models/buyer/buyer.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.scss']
})
export class BuyerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  buyers: Buyer[] = []; // Definir o tipo do array como Buyer[]
  dataSource = new MatTableDataSource<Buyer>(this.buyers);
  selectedBuyers: Buyer[] = []; // Definir o tipo do array como Buyer[]
  page = 1;
  pageSize = 20;
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'date', 'blocked', 'actions']; 

  constructor() { }

  ngOnInit(): void {
    // Inicializar a lista de compradores (deve ser substituído por dados reais)
    this.buyers = [
      // Dados fictícios
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 2, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 3, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 4, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 5, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 6, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 7, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 8, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 9, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 10, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 11, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 12, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 13, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 14, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 15, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 16, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 17, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 18, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 19, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 20, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 21, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      { id: 22, name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: '01/01/2023', blocked: false },
      // Adicione mais compradores conforme necessário

    ];

    this.dataSource.data = this.buyers;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
  }


  toggleSelection(buyer: Buyer) {
    const index = this.selectedBuyers.indexOf(buyer);
    if (index === -1) {
      this.selectedBuyers.push(buyer);
    } else {
      this.selectedBuyers.splice(index, 1);
    }
  }

  toggleAllSelection(event: any) {
    if (event.checked) {
      this.selectedBuyers = [...this.buyers];
    } else {
      this.selectedBuyers = [];
    }
  }

  editBuyer(buyer: Buyer) {
    // Lógica para editar o comprador
    console.log('Edit buyer:', buyer);
  }
}
