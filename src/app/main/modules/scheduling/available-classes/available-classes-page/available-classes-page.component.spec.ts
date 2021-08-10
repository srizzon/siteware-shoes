import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvailableClassesPageComponent } from './available-classes-page.component';

describe('AvailableClassesPageComponent', () => {
  let component: AvailableClassesPageComponent;
  let fixture: ComponentFixture<AvailableClassesPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableClassesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableClassesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
