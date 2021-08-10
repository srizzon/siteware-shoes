import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupReleasePageComponent } from './group-release-page.component';

describe('GroupReleasePageComponent', () => {
  let component: GroupReleasePageComponent;
  let fixture: ComponentFixture<GroupReleasePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupReleasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupReleasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
