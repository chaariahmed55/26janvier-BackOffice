import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionDebatComponent } from './projection-debat.component';

describe('ProjectionDebatComponent', () => {
  let component: ProjectionDebatComponent;
  let fixture: ComponentFixture<ProjectionDebatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectionDebatComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionDebatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
