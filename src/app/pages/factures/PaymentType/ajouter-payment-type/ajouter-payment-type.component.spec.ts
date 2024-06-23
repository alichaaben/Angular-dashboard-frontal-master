import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPaymentTypeComponent } from './ajouter-payment-type.component';

describe('AjouterPaymentTypeComponent', () => {
  let component: AjouterPaymentTypeComponent;
  let fixture: ComponentFixture<AjouterPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPaymentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
