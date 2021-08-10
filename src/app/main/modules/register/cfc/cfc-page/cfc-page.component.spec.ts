import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CfcPageComponent } from './cfc-page.component';

describe('CfcPageComponent', () => {
  let component: CfcPageComponent;
  let fixture: ComponentFixture<CfcPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CfcPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
