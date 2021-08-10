import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansiveCustomTableComponent } from './expansive-custom-table.component';

describe('ExpansiveCustomTableComponent', () => {
  let component: ExpansiveCustomTableComponent;
  let fixture: ComponentFixture<ExpansiveCustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansiveCustomTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansiveCustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
