import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CandidateAutocompleteComponent } from './candidate-autocomplete.component';

describe('CandidateAutocompleteComponent', () => {
  let component: CandidateAutocompleteComponent;
  let fixture: ComponentFixture<CandidateAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
