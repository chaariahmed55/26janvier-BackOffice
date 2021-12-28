import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubackComponent } from './menuback.component';

describe('MenubackComponent', () => {
  let component: MenubackComponent;
  let fixture: ComponentFixture<MenubackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenubackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
