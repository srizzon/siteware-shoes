import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmCommentsDialogComponent } from './confirm-comments-dialog.component';

describe('ConfirmCommentsDialogComponent', () => {
  let component: ConfirmCommentsDialogComponent;
  let fixture: ComponentFixture<ConfirmCommentsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCommentsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
