import { TipoDeExameComponent } from './tipo-de-exame.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


describe('TipoDeExameComponent', () => {
  let component: TipoDeExameComponent;
  let fixture: ComponentFixture<TipoDeExameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeExameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
