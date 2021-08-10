import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentCreditPageComponent } from './enrollment-credit-page.component';

describe('EnrollmentCreditPageComponent', () => {
  let component: EnrollmentCreditPageComponent;
  let fixture: ComponentFixture<EnrollmentCreditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentCreditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentCreditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
