import { TestBed } from '@angular/core/testing';

import { OtherresourceService } from './otherresource.service';

describe('OtherresourceService', () => {
  let service: OtherresourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherresourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
