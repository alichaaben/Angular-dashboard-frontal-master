import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentTypeComponent } from './list-payment-type.component';

describe('ListPaymentTypeComponent', () => {
  let component: ListPaymentTypeComponent;
  let fixture: ComponentFixture<ListPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaymentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
