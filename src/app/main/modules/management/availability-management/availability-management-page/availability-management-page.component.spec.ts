import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityManagementPageComponent } from './availability-management-page.component';

describe('AvailabilityManagementPageComponent', () => {
  let component: AvailabilityManagementPageComponent;
  let fixture: ComponentFixture<AvailabilityManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
