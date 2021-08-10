import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnrollmentDataSchedulingComponent } from './enrollment-data-scheduling.component';

describe('EnrollmentDataSchedulingComponent', () => {
  let component: EnrollmentDataSchedulingComponent;
  let fixture: ComponentFixture<EnrollmentDataSchedulingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentDataSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDataSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
