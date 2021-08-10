import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatePickerCustomComponent } from './date-picker-custom.component';

describe('DatePickerCustomComponent', () => {
  let component: DatePickerCustomComponent;
  let fixture: ComponentFixture<DatePickerCustomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
