import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerEditComponent } from './buyer-edit.component';

describe('BuyerEditComponent', () => {
  let component: BuyerEditComponent;
  let fixture: ComponentFixture<BuyerEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerEditComponent]
    });
    fixture = TestBed.createComponent(BuyerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
