import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalSchedulingComponent } from './practical-scheduling.component';

describe('PracticalSchedulingComponent', () => {
  let component: PracticalSchedulingComponent;
  let fixture: ComponentFixture<PracticalSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
