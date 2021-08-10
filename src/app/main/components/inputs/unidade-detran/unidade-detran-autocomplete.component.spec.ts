import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnidadeDetranAutocompleteComponent } from './unidade-detran-autocomplete.component';

describe('UnidadeDetranAutocompleteComponent', () => {
  let component: UnidadeDetranAutocompleteComponent;
  let fixture: ComponentFixture<UnidadeDetranAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeDetranAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeDetranAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
