import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CfcAutocompleteComponent } from './cfc-autocomplete.component';

describe('CfcAutocompleteComponent', () => {
  let component: CfcAutocompleteComponent;
  let fixture: ComponentFixture<CfcAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CfcAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
