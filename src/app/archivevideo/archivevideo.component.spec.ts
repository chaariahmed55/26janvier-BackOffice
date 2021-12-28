import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivevideoComponent } from './archivevideo.component';

describe('ArchivevideoComponent', () => {
  let component: ArchivevideoComponent;
  let fixture: ComponentFixture<ArchivevideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivevideoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
