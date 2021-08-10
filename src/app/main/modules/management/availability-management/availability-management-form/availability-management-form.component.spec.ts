import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityManagementFormComponent } from './availability-management-form.component';

describe('AvailabilityManagementFormComponent', () => {
  let component: AvailabilityManagementFormComponent;
  let fixture: ComponentFixture<AvailabilityManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityManagementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
