import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PracticalCalendarComponent } from './practical-calendar.component';

describe('PracticalCalendarComponent', () => {
  let component: PracticalCalendarComponent;
  let fixture: ComponentFixture<PracticalCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
