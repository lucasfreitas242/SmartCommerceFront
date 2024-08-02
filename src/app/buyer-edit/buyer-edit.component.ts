import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNgxMask } from 'ngx-mask';

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

  mask: string = ''; 

  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BuyerEditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buyerData = data.buyer;

    this.buyerForm = this.fb.group({
      name: [this.buyerData.name, [Validators.required, Validators.maxLength(150)]],
      email: [this.buyerData.email, [Validators.required, Validators.email, Validators.pattern(this.emailPattern), Validators.maxLength(150)]],
      phone: [this.buyerData.phone, [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      personType: [this.buyerData.personType, Validators.required],
      cpfCnpj: [this.buyerData.document, [Validators.required, Validators.pattern(/^\d*$/)]],
      stateRegistration: [this.buyerData.stateRegistration, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{3}$/)],
      gender: [this.buyerData.gender],
      birthDate: [this.buyerData.birthDate],
      password: [this.buyerData.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: [this.buyerData.confirmPassword, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      blocked: [this.buyerData.blocked]
    });
  }

  ngOnInit(): void {
    console.log("Buyer: "+ this.data.buyer)
    if (this.data.buyer) {
      // Carregar os dados do comprador com base no ID
      // this.buyerService.getBuyerById(this.data.buyerId).subscribe(data => {
      //   this.buyerForm.patchValue(data);
      // });
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

  updateBuyer(): void {
    if (this.buyerForm.valid) {
      // Atualizar comprador
      // this.buyerService.updateBuyer(this.data.buyerId, this.buyerForm.value).subscribe(() => {
      //   this.snackBar.open('Comprador atualizado com sucesso!', 'Fechar', {
      //     duration: 3000
      //   });
      //   this.dialogRef.close(); 
      // });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); 
  }
}
