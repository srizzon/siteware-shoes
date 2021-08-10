import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceGridFormComponent } from './service-grid-form.component';

describe('ServiceGridFormComponent', () => {
  let component: ServiceGridFormComponent;
  let fixture: ComponentFixture<ServiceGridFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceGridFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGridFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
