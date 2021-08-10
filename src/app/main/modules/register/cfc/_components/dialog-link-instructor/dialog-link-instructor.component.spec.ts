import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLinkInstructorComponent } from './dialog-link-instructor.component';

describe('DialogLinkInstructorComponent', () => {
  let component: DialogLinkInstructorComponent;
  let fixture: ComponentFixture<DialogLinkInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLinkInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLinkInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
