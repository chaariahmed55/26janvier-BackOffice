import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRetombeMediatiqueComponent } from './video-retombe-mediatique.component';

describe('VideoRetombeMediatiqueComponent', () => {
  let component: VideoRetombeMediatiqueComponent;
  let fixture: ComponentFixture<VideoRetombeMediatiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoRetombeMediatiqueComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRetombeMediatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
