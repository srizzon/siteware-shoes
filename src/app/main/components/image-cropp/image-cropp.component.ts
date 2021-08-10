import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropp',
  templateUrl: './image-cropp.component.html',
})
export class ImageCroppComponent implements OnInit, OnDestroy {

  @ViewChild('input', {static : true}) inputEl: ElementRef;

  public imageData: any = '';
  public imageEvent: any = '';
  public selected = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(public dialogRef: MatDialogRef<ImageCroppComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.selectImage();
  }

  selectImage() { this.inputEl.nativeElement.click(); }


  ok() {
    if (this.imageData) {
      const image = { imageData: this.imageData, extension: null };

      image.extension = this.imageData.base64.split(';')[0].split('/')[1];

      this.dialogRef.close(image);
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}

  onFileChange(imageEvent) {
    this.imageEvent = imageEvent;
  }

  onBase64(imageData) {
    this.imageData = imageData;
  }

  onSelected() {
    this.selected = true;
  }

  onImageFiled() { }


  ngOnDestroy() { }



  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image) {
    this.imageEvent = image;
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
