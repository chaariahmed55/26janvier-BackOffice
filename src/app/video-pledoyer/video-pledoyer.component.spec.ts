import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPledoyerComponent } from './video-pledoyer.component';

describe('VideoPledoyerComponent', () => {
  let component: VideoPledoyerComponent;
  let fixture: ComponentFixture<VideoPledoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoPledoyerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPledoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
