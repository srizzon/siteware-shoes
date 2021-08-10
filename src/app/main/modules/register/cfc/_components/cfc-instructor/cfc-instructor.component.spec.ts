import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcInstructorComponent } from './cfc-instructor.component';

describe('CfcInstructorComponent', () => {
  let component: CfcInstructorComponent;
  let fixture: ComponentFixture<CfcInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfcInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
