import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesDialogComponent } from './sales-dialog.component';

describe('SalesDialogComponent', () => {
  let component: SalesDialogComponent;
  let fixture: ComponentFixture<SalesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
