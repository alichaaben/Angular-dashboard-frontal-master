import { TestBed } from '@angular/core/testing';

import { FactureFileUploadService } from './facture-file-upload.service';

describe('FactureFileUploadService', () => {
  let service: FactureFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactureFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
