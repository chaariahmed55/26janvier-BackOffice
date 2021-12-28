import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoProjectionDebatComponent } from './video-projection-debat.component';

describe('VideoProjectionDebatComponent', () => {
  let component: VideoProjectionDebatComponent;
  let fixture: ComponentFixture<VideoProjectionDebatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoProjectionDebatComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoProjectionDebatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
