import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceWithDiscountComponent } from './price-with-discount.component';

describe('PriceWithDiscountComponent', () => {
  let component: PriceWithDiscountComponent;
  let fixture: ComponentFixture<PriceWithDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceWithDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceWithDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
