import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderInsidePageComponent } from './header-inside-page.component';

describe('HeaderInsidePageComponent', () => {
  let component: HeaderInsidePageComponent;
  let fixture: ComponentFixture<HeaderInsidePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderInsidePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderInsidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
