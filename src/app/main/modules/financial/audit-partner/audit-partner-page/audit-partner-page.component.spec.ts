import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuditPartnerPageComponent } from './audit-partner-page.component';

describe('AuditPartnerPageComponent', () => {
  let component: AuditPartnerPageComponent;
  let fixture: ComponentFixture<AuditPartnerPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditPartnerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditPartnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
