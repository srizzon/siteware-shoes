import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceAutocompleteComponent } from './service-autocomplete.component';

describe('CfcAutocompleteComponent', () => {
  let component: ServiceAutocompleteComponent;
  let fixture: ComponentFixture<ServiceAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
