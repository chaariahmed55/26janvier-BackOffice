import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetombemediatiqueComponent } from './retombemediatique.component';

describe('RetombemediatiqueComponent', () => {
  let component: RetombemediatiqueComponent;
  let fixture: ComponentFixture<RetombemediatiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetombemediatiqueComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetombemediatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
