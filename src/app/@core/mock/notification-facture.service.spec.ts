import { TestBed } from '@angular/core/testing';

import { NotificationFactureService } from './notification-facture.service';

describe('NotificationFactureService', () => {
  let service: NotificationFactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationFactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
