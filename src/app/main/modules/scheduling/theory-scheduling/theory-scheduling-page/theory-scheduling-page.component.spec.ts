import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TheorySchedulingPageComponent } from './theory-scheduling-page.component';

describe('TheorySchedulingPageComponent', () => {
  let component: TheorySchedulingPageComponent;
  let fixture: ComponentFixture<TheorySchedulingPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TheorySchedulingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheorySchedulingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
