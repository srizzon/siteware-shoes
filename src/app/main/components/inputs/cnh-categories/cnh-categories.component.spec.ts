import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CnhCategoriesComponent } from './cnh-categories.component';

describe('CnhCategoriesComponent', () => {
  let component: CnhCategoriesComponent;
  let fixture: ComponentFixture<CnhCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CnhCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnhCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
