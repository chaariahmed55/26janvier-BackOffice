import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTemoignageComponent } from './video-temoignage.component';

describe('VideoTemoignageComponent', () => {
  let component: VideoTemoignageComponent;
  let fixture: ComponentFixture<VideoTemoignageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoTemoignageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTemoignageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
