import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseSchedullingAutocompleteComponent } from './course-schedulling-autocomplete.component';

describe('CourseSchedullingAutocompleteComponent', () => {
  let component: CourseSchedullingAutocompleteComponent;
  let fixture: ComponentFixture<CourseSchedullingAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSchedullingAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSchedullingAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
