import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceSchedullingAutocompleteComponent } from './service-schedulling-autocomplete.component';

describe('ServiceSchedullingAutocompleteComponent', () => {
  let component: ServiceSchedullingAutocompleteComponent;
  let fixture: ComponentFixture<ServiceSchedullingAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSchedullingAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSchedullingAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
