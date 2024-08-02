import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buyer-filter',
  templateUrl: './buyer-filter.component.html',
  styleUrls: ['./buyer-filter.component.scss']
})
export class BuyerFilterComponent {
  filterForm: FormGroup;

  @Input() showFilter: boolean = false;

  @Output() filterApplied = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      personType: [''],
      cpfCnpj: [''],
      stateRegistration: [''],
      blocked: [false]
    });
  }

  applyFilter() {
    this.filterApplied.emit(this.filterForm.value);
  }

  clearFilter() {
    this.filterForm.reset();
  }
}
