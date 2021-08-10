import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnrollmentDataCreditsComponent } from './enrollment-data-credits.component';

describe('EnrollmentDataCreditsComponent', () => {
  let component: EnrollmentDataCreditsComponent;
  let fixture: ComponentFixture<EnrollmentDataCreditsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentDataCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDataCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
