import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { BuyerService } from 'src/services/buyer.service';
import { Buyer } from '../models/buyer/buyer.model';

@Component({
  selector: 'app-buyer-edit',
  templateUrl: './buyer-edit.component.html',
  styleUrls: ['./buyer-edit.component.scss'],
  providers: [
    provideNgxMask()
  ]
})
export class BuyerEditComponent implements OnInit {
  buyerForm: FormGroup;
  buyerData: any;

  isExempt: boolean = false;

  mask: string = ''; 

  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BuyerEditComponent>,
    private snackBar: MatSnackBar,
    private buyerService: BuyerService, 
    private router: Router,
    
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buyerData = data.buyer;

    this.buyerForm = this.fb.group({
      name: [this.buyerData.name, [Validators.required, Validators.maxLength(150)]],
      email: [this.buyerData.email, [Validators.required, Validators.email, Validators.pattern(this.emailPattern), Validators.maxLength(150)]],
      phone: [this.buyerData.phone, [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      personType: [this.buyerData.personType, Validators.required],
      cpfCnpj: [this.buyerData.document, [Validators.required, Validators.pattern(/^\d*$/)]],
      stateRegistration: [this.buyerData.stateRegistration],
      gender: [this.buyerData.gender],
      birthDate: [this.buyerData.birthDate],
      password: [this.buyerData.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: [this.buyerData.confirmPassword, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      blocked: [this.buyerData.blocked],
      exempt: [this.buyerData.exempt],
      createdAt: [this.buyerData.createdAt]
    });
  }

  ngOnInit(): void {
    this.buyerForm.controls['exempt'].valueChanges.subscribe(value => {
      this.isExempt = value;
    })

    console.log("Buyer: "+ this.data.buyer)
    if (this.data.buyer) {
      // Carregar os dados do comprador com base no ID
      // this.buyerService.getBuyerById(this.data.buyerId).subscribe(data => {
        this.buyerForm.patchValue(this.buyerData);
      // });
    }
  }

  updateBuyer(): void {
    if (this.buyerForm.valid) {
      const updatedBuyer = this.buyerForm.value as Buyer;
      updatedBuyer.id = this.data.buyer.id; 
      this.buyerService.updateBuyer(this.data.buyer.id, updatedBuyer).subscribe({
        next: (response) => {
          this.snackBar.open('Comprador atualizado com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close();
          this.router.navigate(['/buyers']);
        },
        error: (err) => {
          this.snackBar.open('Erro ao atualizar comprador. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao atualizar comprador', err);
        }
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
  }

  onCheckboxChange(event: any): void {
    this.isExempt = event.checked;
    this.buyerForm.controls['stateRegistration'].clearValidators();
    this.toggleFieldDisability(this.isExempt);
  }

  toggleFieldDisability(isDisabled: boolean): void {
    const myFieldControl = this.buyerForm.get('stateRegistration');
    if (isDisabled) {
      myFieldControl?.disable();
    } else {
      myFieldControl?.enable();
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.buyerForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }

  onCpfCnpjBlur(event: any) {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, ''); 

    if (numericValue.length > 11) {
      this.mask = '00.000.000/0000-00'; 
    } else if (numericValue.length > 0) {
      this.mask = '000.000.000-00'; 
    } else {
      this.mask = ''; 
    }
  }

  onCpfCnpjFocus(event: any) {
    this.mask = ''; 
  }

  onNoClick(): void {
    this.dialogRef.close(); 
  }
}
