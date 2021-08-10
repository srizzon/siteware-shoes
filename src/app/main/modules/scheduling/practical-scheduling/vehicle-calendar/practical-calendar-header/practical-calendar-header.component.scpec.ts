import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalCalendarHeaderComponent } from './practical-calendar-header.component';

describe('PracticalCalendarHeaderComponent', () => {
  let component: PracticalCalendarHeaderComponent;
  let fixture: ComponentFixture<PracticalCalendarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalCalendarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
