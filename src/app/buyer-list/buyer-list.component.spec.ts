import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerListComponent } from './buyer-list.component';

describe('BuyerListComponent', () => {
  let component: BuyerListComponent;
  let fixture: ComponentFixture<BuyerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerListComponent]
    });
    fixture = TestBed.createComponent(BuyerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});