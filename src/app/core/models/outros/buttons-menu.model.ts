
export class ButtonsMenuModel {
  create?: boolean;
  update?: boolean;
  back?: boolean;
  enable?: boolean;
  delete?: boolean;
  propertyId?: string;
  propertyActive?: string;
  showButtons?: boolean;

  constructor(options: ButtonsMenuModel = {}) {
    this.back = options.back || false;
    this.create = options.create || false;
    this.enable = options.enable || false;
    this.delete = options.delete || false;
    this.propertyId = options.propertyId || null;
    this.propertyActive = options.propertyActive || null;
    this.showButtons = options.showButtons || false;
    this.update = options.update || false;
  }
}
