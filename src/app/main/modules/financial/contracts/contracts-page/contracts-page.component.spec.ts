import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContractsPageComponent } from './contracts-page.component';


describe('ContractsPageComponent', () => {
  let component: ContractsPageComponent;
  let fixture: ComponentFixture<ContractsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
