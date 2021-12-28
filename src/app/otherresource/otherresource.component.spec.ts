import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherresourceComponent } from './otherresource.component';

describe('OtherresourceComponent', () => {
  let component: OtherresourceComponent;
  let fixture: ComponentFixture<OtherresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtherresourceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
