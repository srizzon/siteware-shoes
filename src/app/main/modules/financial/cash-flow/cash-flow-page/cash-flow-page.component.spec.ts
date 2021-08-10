import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CashFlowPageComponent } from './cash-flow-page.component';

describe('CashFlowPageComponent', () => {
  let component: CashFlowPageComponent;
  let fixture: ComponentFixture<CashFlowPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CashFlowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
