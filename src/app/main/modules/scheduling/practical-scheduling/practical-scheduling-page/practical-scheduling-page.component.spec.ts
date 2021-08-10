import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalSchedulingPageComponent } from './practical-scheduling-page.component';

describe('PracticalSchedulingPageComponent', () => {
  let component: PracticalSchedulingPageComponent;
  let fixture: ComponentFixture<PracticalSchedulingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalSchedulingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalSchedulingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
