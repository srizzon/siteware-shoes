import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnrollmentDataRegisterComponent } from './enrollment-data-register.component';

describe('EnrollmentDataRegisterComponent', () => {
  let component: EnrollmentDataRegisterComponent;
  let fixture: ComponentFixture<EnrollmentDataRegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentDataRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDataRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
