import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialReleasesComponent } from './financial-releases.component';

describe('FinancialReleasesComponent', () => {
  let component: FinancialReleasesComponent;
  let fixture: ComponentFixture<FinancialReleasesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialReleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
