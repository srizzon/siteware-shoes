import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PraticalClassDetailDialogComponent } from './pratical-class-detail-dialog.component';

describe('PraticalClassDetailDialogComponent', () => {
  let component: PraticalClassDetailDialogComponent;
  let fixture: ComponentFixture<PraticalClassDetailDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PraticalClassDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticalClassDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
