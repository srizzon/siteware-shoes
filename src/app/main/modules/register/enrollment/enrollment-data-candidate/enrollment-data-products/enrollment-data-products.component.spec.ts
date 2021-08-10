import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDataProductsComponent } from './enrollment-data-products.component';

describe('EnrollmentDataProductsComponent', () => {
  let component: EnrollmentDataProductsComponent;
  let fixture: ComponentFixture<EnrollmentDataProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentDataProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDataProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
