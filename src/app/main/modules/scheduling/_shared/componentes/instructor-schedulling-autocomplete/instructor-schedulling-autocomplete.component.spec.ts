import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstructorSchedullingAutocompleteComponent } from './instructor-schedulling-autocomplete.component';

describe('InstructorSchedullingAutocompleteComponent', () => {
  let component: InstructorSchedullingAutocompleteComponent;
  let fixture: ComponentFixture<InstructorSchedullingAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorSchedullingAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorSchedullingAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
