import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableCustomComponent } from './table-custom.component';

describe('TableCustomComponent', () => {
  let component: TableCustomComponent;
  let fixture: ComponentFixture<TableCustomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
