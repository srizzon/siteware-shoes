import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocaisDialogComponent } from './locais-dialog.component';

describe('LocaisDialogComponent', () => {
  let component: LocaisDialogComponent;
  let fixture: ComponentFixture<LocaisDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
