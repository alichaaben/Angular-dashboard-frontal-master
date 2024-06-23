import { TestBed } from '@angular/core/testing';

import { MontantPartielleService } from './montant-partielle.service';

describe('MontantPartielleService', () => {
  let service: MontantPartielleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontantPartielleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
