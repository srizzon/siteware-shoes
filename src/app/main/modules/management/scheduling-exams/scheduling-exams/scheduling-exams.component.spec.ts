import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingExamsComponent } from './scheduling-exams.component';

describe('SchedulingExamsComponent', () => {
  let component: SchedulingExamsComponent;
  let fixture: ComponentFixture<SchedulingExamsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
