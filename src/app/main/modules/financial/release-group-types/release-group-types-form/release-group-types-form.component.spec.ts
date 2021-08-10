import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReleaseGroupTypesFormComponent } from './release-group-types-form.component';

describe('ReleaseGroupTypesFormComponent', () => {
  let component: ReleaseGroupTypesFormComponent;
  let fixture: ComponentFixture<ReleaseGroupTypesFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseGroupTypesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseGroupTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
