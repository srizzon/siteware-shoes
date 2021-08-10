import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalSchedulingFormComponent } from './practical-scheduling-form.component';

describe('PracticalSchedulingFormComponent', () => {
  let component: PracticalSchedulingFormComponent;
  let fixture: ComponentFixture<PracticalSchedulingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalSchedulingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalSchedulingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
