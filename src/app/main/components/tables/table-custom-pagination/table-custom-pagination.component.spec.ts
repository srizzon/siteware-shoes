import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableCustomPaginatorComponent } from './table-custom-pagination.component';

describe('TableCustomPaginatorComponent', () => {
  let component: TableCustomPaginatorComponent;
  let fixture: ComponentFixture<TableCustomPaginatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCustomPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCustomPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
