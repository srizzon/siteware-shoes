import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CfcSchedullingAutocompleteComponent } from './cfc-schedulling-autocomplete.component';

describe('CfcSchedullingAutocompleteComponent', () => {
  let component: CfcSchedullingAutocompleteComponent;
  let fixture: ComponentFixture<CfcSchedullingAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CfcSchedullingAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcSchedullingAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
