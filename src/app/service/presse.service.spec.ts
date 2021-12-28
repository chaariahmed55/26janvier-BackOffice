import { TestBed } from '@angular/core/testing';

import { PresseService } from './presse.service';

describe('PresseService', () => {
  let service: PresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
