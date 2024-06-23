import { TestBed } from '@angular/core/testing';

import { FacturetimelineService } from './facturetimeline.service';

describe('FacturetimelineService', () => {
  let service: FacturetimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturetimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
