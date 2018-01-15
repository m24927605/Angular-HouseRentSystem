import { TestBed, inject } from '@angular/core/testing';

import { RentDetailService } from './rent-detail.service';

describe('RentDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentDetailService]
    });
  });

  it('should be created', inject([RentDetailService], (service: RentDetailService) => {
    expect(service).toBeTruthy();
  }));
});
