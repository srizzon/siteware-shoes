import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnrollmentDataPageComponent } from './enrollment-data-page.component';

describe('EnrollmentDataPageComponent', () => {
  let component: EnrollmentDataPageComponent;
  let fixture: ComponentFixture<EnrollmentDataPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
