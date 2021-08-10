import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcListComponent } from './cfc-list.component';

describe('CfcListComponent', () => {
  let component: CfcListComponent;
  let fixture: ComponentFixture<CfcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfcListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
