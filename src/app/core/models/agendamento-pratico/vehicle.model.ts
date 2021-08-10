export class VehicleModel {
  id?: number;
  category?: string;
  licencePlate?: string;
  enabled?: boolean;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;

  constructor(options: VehicleModel = {}) {
    this.id = options.id || null;
    this.category = options.category || null;
    this.licencePlate = options.licencePlate || null;
    this.enabled = options.enabled || null;
    this.createdByUsername = options.createdByUsername || null;
    this.createdDate = options.createdDate || null;
    this.updatedByUsername = options.updatedByUsername || null;
    this.updatedDate = options.updatedDate || null;
  }
}
