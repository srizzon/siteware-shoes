import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceGridPageComponent } from './service-grid-page.component';

describe('ServiceGridPageComponent', () => {
  let component: ServiceGridPageComponent;
  let fixture: ComponentFixture<ServiceGridPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceGridPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
