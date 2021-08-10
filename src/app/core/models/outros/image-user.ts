export class ImageUser {
    imageData?: any;
    extensiona?: string;

    constructor(
      options: ImageUser = {}
    ) {
      this.imageData = options.imageData || null;
      this.extensiona = options.extensiona || null;
    }
}
