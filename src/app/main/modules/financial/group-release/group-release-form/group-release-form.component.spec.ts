import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditGroupReleaseComponent } from './edit-group-release.component';

describe('EditGroupReleaseComponent', () => {
  let component: EditGroupReleaseComponent;
  let fixture: ComponentFixture<EditGroupReleaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
