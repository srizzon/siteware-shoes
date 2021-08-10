import { TopicoAutocompleteComponent } from './topico-autocomplete.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


describe('TopicoAutocompleteComponent', () => {
  let component: TopicoAutocompleteComponent;
  let fixture: ComponentFixture<TopicoAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicoAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicoAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
