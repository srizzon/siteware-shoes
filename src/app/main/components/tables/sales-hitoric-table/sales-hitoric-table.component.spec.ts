import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesHitoricTableComponent } from './sales-hitoric-table.component';

describe('SalesHitoricTableComponent', () => {
  let component: SalesHitoricTableComponent;
  let fixture: ComponentFixture<SalesHitoricTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesHitoricTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesHitoricTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
