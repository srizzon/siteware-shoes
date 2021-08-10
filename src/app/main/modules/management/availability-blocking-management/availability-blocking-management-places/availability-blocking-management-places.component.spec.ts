import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityBlockingManagementPlacesComponent } from './availability-blocking-management-places.component';

describe('AvailabilityBlockingManagementPlacesComponent', () => {
  let component: AvailabilityBlockingManagementPlacesComponent;
  let fixture: ComponentFixture<AvailabilityBlockingManagementPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityBlockingManagementPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityBlockingManagementPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
