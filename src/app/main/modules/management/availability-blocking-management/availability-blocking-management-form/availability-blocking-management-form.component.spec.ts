import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityBlockingManagementFormComponent } from './availability-blocking-management-form.component';

describe('AvailabilityBlockingManagementFormComponent', () => {
  let component: AvailabilityBlockingManagementFormComponent;
  let fixture: ComponentFixture<AvailabilityBlockingManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityBlockingManagementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityBlockingManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
