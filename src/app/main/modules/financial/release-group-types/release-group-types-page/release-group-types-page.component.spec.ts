import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReleaseGroupTypesPageComponent } from './release-group-types-page.component';

describe('ReleaseGroupTypesPageComponent', () => {
  let component: ReleaseGroupTypesPageComponent;
  let fixture: ComponentFixture<ReleaseGroupTypesPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseGroupTypesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseGroupTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
