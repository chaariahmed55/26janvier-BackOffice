import { TestBed } from '@angular/core/testing';

import { RetombemediatiqueService } from './retombemediatique.service';

describe('RetombemediatiqueService', () => {
  let service: RetombemediatiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetombemediatiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
