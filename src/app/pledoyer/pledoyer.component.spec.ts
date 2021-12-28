import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PledoyerComponent } from './pledoyer.component';

describe('PledoyerComponent', () => {
  let component: PledoyerComponent;
  let fixture: ComponentFixture<PledoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PledoyerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PledoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
