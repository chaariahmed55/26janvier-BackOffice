import { TestBed } from '@angular/core/testing';

import { BrochureService } from './brochure.service';

describe('BrochureService', () => {
  let service: BrochureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrochureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
