import { TestBed } from '@angular/core/testing';

import { ProjectiondebatService } from './projectiondebat.service';

describe('ProjectiondebatService', () => {
  let service: ProjectiondebatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectiondebatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
