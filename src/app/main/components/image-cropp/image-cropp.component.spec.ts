import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ImageCroppComponent } from './image-cropp.component';
import { MatDialogModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';

describe('ImageCroppComponent', () => {
  let component: ImageCroppComponent;
  let fixture: ComponentFixture<ImageCroppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageCroppComponent,
      ],
      imports: [
        ImageCropperModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCroppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
