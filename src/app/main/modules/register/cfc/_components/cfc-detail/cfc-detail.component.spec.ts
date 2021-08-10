import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcDetailComponent } from './cfc-detail.component';

describe('CfcDetailComponent', () => {
  let component: CfcDetailComponent;
  let fixture: ComponentFixture<CfcDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfcDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
