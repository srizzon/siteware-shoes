import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityBlockingManagementPageComponent } from './availability-blocking-management-page.component';

describe('AvailabilityBlockingManagementPageComponent', () => {
  let component: AvailabilityBlockingManagementPageComponent;
  let fixture: ComponentFixture<AvailabilityBlockingManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityBlockingManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityBlockingManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
