import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingExamsPageComponent } from './scheduling-exams-page.component';

describe('SchedulingExamsPageComponent', () => {
  let component: SchedulingExamsPageComponent;
  let fixture: ComponentFixture<SchedulingExamsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingExamsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingExamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
