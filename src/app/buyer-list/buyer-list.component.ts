import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer } from '../models/buyer/buyer.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BuyerEditComponent } from '../buyer-edit/buyer-edit.component';
import { BuyerService } from 'src/services/buyer.service';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.scss']
})
export class BuyerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  buyers: Buyer[] = []; 
  dataSource = new MatTableDataSource<Buyer>(this.buyers);
  selectedBuyers: Buyer[] = []; 
  page = 1;
  pageSize = 20;
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'date', 'blocked', 'actions'];
  isFilterPageOpen: boolean = false;
  isEditPageOpen: boolean = false;
  filteredBuyers: Buyer[] = [];
  showFilter: boolean = false;

  buyer: Buyer | null = null;

  constructor(private dialog: MatDialog, private buyerService: BuyerService) { }

  ngOnInit(): void {
    // Inicializar a lista de compradores (deve ser substituído por dados reais)
    this.loadBuyers();
    // this.buyers = [
    //   { id: 5, name: 'Alice Smith', personType: "2", stateRegistration: "1234567890", document: "9876543", email: 'alice@example.com', phone: '0987654321', date: '15/03/2023', blocked: true },
    //   { id: 3, name: 'Bob Johnson', personType: "1", stateRegistration: "0987654321", document: "1234567", email: 'bob@example.com', phone: '1230984567', date: '20/07/2022', blocked: false },
    //   { id: 17, name: 'Charlie Brown', personType: "2", stateRegistration: "5678901234", document: "5432109", email: 'charlie@example.com', phone: '3214567890', date: '30/05/2024', blocked: true },
    //   { id: 12, name: 'David Wilson', personType: "1", stateRegistration: "3456789012", document: "6789012", email: 'david@example.com', phone: '6543210987', date: '11/11/2023', blocked: false },
    //   { id: 20, name: 'Eva Green', personType: "2", stateRegistration: "2345678901", document: "8901234", email: 'eva@example.com', phone: '5678901234', date: '04/02/2023', blocked: true },
    //   { id: 8, name: 'Frank White', personType: "1", stateRegistration: "7890123456", document: "3456789", email: 'frank@example.com', phone: '8765432109', date: '12/12/2022', blocked: false },
    //   { id: 1, name: 'Grace Adams', personType: "2", stateRegistration: "4567890123", document: "2345678", email: 'grace@example.com', phone: '4321098765', date: '08/09/2023', blocked: true },
    //   { id: 13, name: 'Hannah Clark', personType: "1", stateRegistration: "8901234567", document: "4567890", email: 'hannah@example.com', phone: '3216549870', date: '17/04/2024', blocked: false },
    //   { id: 9, name: 'Isaac Lewis', personType: "2", stateRegistration: "6789012345", document: "5678901", email: 'isaac@example.com', phone: '2109876543', date: '22/06/2023', blocked: true },
    //   { id: 15, name: 'Jack Turner', personType: "1", stateRegistration: "9012345678", document: "6789012", email: 'jack@example.com', phone: '3456789012', date: '14/01/2023', blocked: false },
    //   { id: 4, name: 'Kelly Martinez', personType: "2", stateRegistration: "3456789012", document: "7890123", email: 'kelly@example.com', phone: '4567890123', date: '19/07/2022', blocked: true },
    //   { id: 18, name: 'Liam Robinson', personType: "1", stateRegistration: "5678901234", document: "8901234", email: 'liam@example.com', phone: '5678901234', date: '27/02/2024', blocked: false },
    //   { id: 2, name: 'Mia Walker', personType: "2", stateRegistration: "2345678901", document: "9012345", email: 'mia@example.com', phone: '6789012345', date: '13/03/2023', blocked: true },
    //   { id: 16, name: 'Noah Allen', personType: "1", stateRegistration: "4567890123", document: "1234567", email: 'noah@example.com', phone: '7890123456', date: '06/10/2023', blocked: false },
    //   { id: 7, name: 'Olivia Scott', personType: "2", stateRegistration: "6789012345", document: "2345678", email: 'olivia@example.com', phone: '8901234567', date: '21/08/2023', blocked: true },
    //   { id: 6, name: 'Paul Young', personType: "1", stateRegistration: "9012345678", document: "3456789", email: 'paul@example.com', phone: '9012345678', date: '25/09/2024', blocked: false },
    //   { id: 10, name: 'Quincy Harris', personType: "2", stateRegistration: "1234567890", document: "4567890", email: 'quincy@example.com', phone: '2345678901', date: '02/12/2023', blocked: true },
    //   { id: 21, name: 'Rachel King', personType: "1", stateRegistration: "2345678901", document: "5678901", email: 'rachel@example.com', phone: '3456789012', date: '29/11/2023', blocked: false },
    //   { id: 14, name: 'Steve Wright', personType: "2", stateRegistration: "4567890123", document: "6789012", email: 'steve@example.com', phone: '4567890123', date: '18/04/2024', blocked: true },
    //   { id: 19, name: 'Tina Lee', personType: "1", stateRegistration: "5678901234", document: "7890123", email: 'tina@example.com', phone: '5678901234', date: '26/06/2022', blocked: false },
    //   { id: 22, name: 'Uma Evans', personType: "2", stateRegistration: "6789012345", document: "8901234", email: 'uma@example.com', phone: '6789012345', date: '05/07/2023', blocked: true }
    // ];

    this.dataSource.data = this.buyers;
    this.filteredBuyers = this.buyers;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
  }

  loadBuyers(filter?: Buyer[]): void {
    if (filter) {
      this.buyerService.filterBuyers(filter).subscribe(
        (data: Buyer[]) => {
          this.buyers = data;
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Erro ao filtrar compradores', error);
        }
      );
    }
    else{
      this.buyerService.getBuyers().subscribe(
        (data: Buyer[]) => {
          this.buyers = data;
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Erro ao carregar compradores', error);
        }
      );
    }
  }

  applyFilter(filterValues: Buyer[]): void {
    this.loadBuyers(filterValues);
  }

  clearFilter(): void {
    this.loadBuyers();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onFilterApplied(filterValues: any) {
    this.filteredBuyers = this.dataSource.data.filter(buyer => {
      return (!filterValues.name || buyer.name.includes(filterValues.name)) &&
             (!filterValues.email || buyer.email.includes(filterValues.email)) &&
             (!filterValues.phone || buyer.phone.includes(filterValues.phone)) &&
             (!filterValues.personType || buyer.personType === filterValues.personType) &&
             (!filterValues.document || buyer.document.includes(filterValues.document)) &&
             (!filterValues.stateRegistration || buyer.stateRegistration.includes(filterValues.stateRegistration)) &&
             (filterValues.blocked === null || buyer.blocked === filterValues.blocked);
    });
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
    this.buyer = buyer;
    this.isEditPageOpen = true;
    console.log('Edit buyer:', buyer);
  }

  openEditDialog(buyer: Buyer): void {
    const dialogRef = this.dialog.open(BuyerEditComponent, {
      width: '600px',
      data: { buyer: buyer }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadBuyers();
    });
  }
}
