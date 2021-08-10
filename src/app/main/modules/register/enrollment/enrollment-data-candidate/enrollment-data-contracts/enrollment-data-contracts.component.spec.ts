import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnrollmentDataContractsComponent } from './enrollment-data-contracts.component';

describe('EnrollmentDataContractsComponent', () => {
  let component: EnrollmentDataContractsComponent;
  let fixture: ComponentFixture<EnrollmentDataContractsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentDataContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDataContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
