import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvailableClassesDetailComponent } from './available-classes-detail.component';

describe('AvailableClassesDetailComponent', () => {
  let component: AvailableClassesDetailComponent;
  let fixture: ComponentFixture<AvailableClassesDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableClassesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableClassesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
