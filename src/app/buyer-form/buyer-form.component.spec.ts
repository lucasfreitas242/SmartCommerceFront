import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerFormComponent } from './buyer-form.component';

describe('BuyerFormComponent', () => {
  let component: BuyerFormComponent;
  let fixture: ComponentFixture<BuyerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerFormComponent]
    });
    fixture = TestBed.createComponent(BuyerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
