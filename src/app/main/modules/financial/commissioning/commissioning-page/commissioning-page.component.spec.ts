import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommissioningPageComponent } from './commissioning-page.component';

describe('CommissioningPageComponent', () => {
  let component: CommissioningPageComponent;
  let fixture: ComponentFixture<CommissioningPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissioningPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissioningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
