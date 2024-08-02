import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerFilterComponent } from './buyer-filter.component';

describe('BuyerFilterComponent', () => {
  let component: BuyerFilterComponent;
  let fixture: ComponentFixture<BuyerFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerFilterComponent]
    });
    fixture = TestBed.createComponent(BuyerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
