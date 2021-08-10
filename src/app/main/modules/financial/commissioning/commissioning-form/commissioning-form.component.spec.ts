import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommissioningFormComponent } from './commissioning-form.component';

describe('CommissioningFormComponent', () => {
  let component: CommissioningFormComponent;
  let fixture: ComponentFixture<CommissioningFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissioningFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissioningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
