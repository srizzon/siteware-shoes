import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VeiculoCfcAutocompleteComponent } from './veiculo-cfc-autocomplete.component';

describe('VeiculoCfcAutocompleteComponent', () => {
  let component: VeiculoCfcAutocompleteComponent;
  let fixture: ComponentFixture<VeiculoCfcAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoCfcAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoCfcAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
