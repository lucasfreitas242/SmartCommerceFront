import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buyer-register',
  templateUrl: './buyer-register.component.html',
  styleUrls: ['./buyer-register.component.scss']
})
export class BuyerRegisterComponent implements OnInit {
  buyerForm: FormGroup;
  isExempt: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.buyerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      personType: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      stateRegistration: ['', Validators.required],
      exempt: [false],
      gender: [''],
      birthDate: [''],
      blocked: [false],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.buyerForm.controls['personType'].valueChanges.subscribe(value => {
      if (value === 'Física') {
        this.buyerForm.controls['gender'].setValidators([Validators.required]);
        this.buyerForm.controls['birthDate'].setValidators([Validators.required]);
      } else {
        this.buyerForm.controls['gender'].clearValidators();
        this.buyerForm.controls['birthDate'].clearValidators();
      }
      this.buyerForm.controls['gender'].updateValueAndValidity();
      this.buyerForm.controls['birthDate'].updateValueAndValidity();
    });
  }

  onExemptChange(event: any) {
    this.isExempt = event.checked;
    if (this.isExempt) {
      this.buyerForm.controls['stateRegistration'].clearValidators();
    } else {
      this.buyerForm.controls['stateRegistration'].setValidators([Validators.required]);
    }
    this.buyerForm.controls['stateRegistration'].updateValueAndValidity();
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
