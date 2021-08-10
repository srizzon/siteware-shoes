import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstructorAutocompleteComponent } from './instructor-autocomplete.component';

describe('InstructorAutocompleteComponent', () => {
  let component: InstructorAutocompleteComponent;
  let fixture: ComponentFixture<InstructorAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
