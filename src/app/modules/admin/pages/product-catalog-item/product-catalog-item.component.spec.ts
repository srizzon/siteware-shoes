import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogItemComponent } from './product-catalog-item.component';

describe('ProductCatalogItemComponent', () => {
  let component: ProductCatalogItemComponent;
  let fixture: ComponentFixture<ProductCatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCatalogItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
