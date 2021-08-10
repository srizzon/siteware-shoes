import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocalAutocompleteComponent } from './local-autocomplete.component';

describe('LocalAutocompleteComponent', () => {
  let component: LocalAutocompleteComponent;
  let fixture: ComponentFixture<LocalAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
