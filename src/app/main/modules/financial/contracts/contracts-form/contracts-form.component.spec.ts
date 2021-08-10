import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractsFormComponent } from './contracts-form.component';

describe('ContractsFormComponent', () => {
  let component: ContractsFormComponent;
  let fixture: ComponentFixture<ContractsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
