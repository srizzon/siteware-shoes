import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CfcFormComponent } from './cfc-form.component';

describe('CfcFormComponent', () => {
  let component: CfcFormComponent;
  let fixture: ComponentFixture<CfcFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CfcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
