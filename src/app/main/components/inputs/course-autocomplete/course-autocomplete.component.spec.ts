import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseAutocompleteComponent } from './course-autocomplete.component';

describe('CourseAutocompleteComponent', () => {
  let component: CourseAutocompleteComponent;
  let fixture: ComponentFixture<CourseAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
