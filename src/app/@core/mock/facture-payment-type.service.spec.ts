import { TestBed } from '@angular/core/testing';

import { FacturePaymentTypeService } from './facture-payment-type.service';

describe('FacturePaymentTypeService', () => {
  let service: FacturePaymentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturePaymentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
