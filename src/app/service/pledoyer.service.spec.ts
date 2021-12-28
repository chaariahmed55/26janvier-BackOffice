import { TestBed } from '@angular/core/testing';

import { PledoyerService } from './pledoyer.service';

describe('PledoyerService', () => {
  let service: PledoyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PledoyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
