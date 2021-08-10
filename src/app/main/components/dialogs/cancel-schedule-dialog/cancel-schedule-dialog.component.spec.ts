import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CancelScheduleDialogComponent } from './cancel-schedule-dialog.component';

describe('CancelScheduleDialogComponent', () => {
  let component: CancelScheduleDialogComponent;
  let fixture: ComponentFixture<CancelScheduleDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelScheduleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
