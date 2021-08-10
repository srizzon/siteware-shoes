import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TheorySchedulingFormComponent } from './theory-scheduling-form.component';

describe('TheorySchedulingFormComponent', () => {
  let component: TheorySchedulingFormComponent;
  let fixture: ComponentFixture<TheorySchedulingFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TheorySchedulingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheorySchedulingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
