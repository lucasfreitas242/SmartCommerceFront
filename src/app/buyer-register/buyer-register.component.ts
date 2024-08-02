import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BuyerService } from 'src/services/buyer.service';

@Component({
  selector: 'app-buyer-register',
  templateUrl: './buyer-register.component.html',
  styleUrls: ['./buyer-register.component.scss']
})
export class BuyerRegisterComponent implements OnInit {
  buyerForm: FormGroup;
  isExempt: boolean = false;

  mask: string = '';
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';


  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private buyerService: BuyerService, private router: Router) {
    
    this.buyerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern), Validators.maxLength(150)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      personType: ['', Validators.required],
      cpfCnpj: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      stateRegistration: [''],
      gender: [''],
      birthDate: [Date.now],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      blocked: [false],
      exempt: [false]
    });
  }

  ngOnInit(): void {

    this.buyerForm.controls['exempt'].valueChanges.subscribe(value => {
      this.isExempt = value;
    })
  }

  createBuyer(): void {
    if (this.buyerForm.valid) {
      const buyer = this.buyerForm.value;
      if (buyer.birthDate === null){
        buyer.birthDate = Date.now;   
      }
      this.buyerService.createBuyer(buyer).subscribe({
        next: (response) => {
          this.snackBar.open('Comprador criado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/buyers']);
        },
        error: (err) => {
          this.snackBar.open('Erro ao criar comprador. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao criar comprador', err);
        }
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
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

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { notMatch: true };
  }

  onSubmit() {
    if (this.buyerForm.valid) {
      // Realizar a lógica para verificar e-mails, CPF/CNPJ e Inscrição Estadual duplicados
      // Exibir mensagens de erro se necessário

      // Se todas as validações passarem, redirecionar para a tela de Clientes
      this.snackBar.open('Cliente adicionado com sucesso!', 'Fechar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 3000,
      });
    }
  }
}
