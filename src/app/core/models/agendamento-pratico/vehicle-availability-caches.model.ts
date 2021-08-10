export class VehicleAvailabilityCachesModel {
  id?: number;
  idVehicleAvailability?: number;
  idVehicle?: number;
  idOrganization?: number;
  organizationName?: string;
  idVehicleAvailabilityException?: number;
  idInstructor?: number;
  instructorName?: string;
  date?: any;
  licencePlate?: string;
  time?: string;
  weekDay?: string;
  shift?: string;
  amountOfferedRoom?: number;
  amountScheduledRoom?: number;
  amountAvailableRoom?: number;
  visible?: boolean;
  enabled?: boolean;

  constructor(options: VehicleAvailabilityCachesModel = {}) {
    this.id = options.id || null;
    this.idVehicleAvailability = options.idVehicleAvailability || null;
    this.idVehicle = options.idVehicle || null;
    this.idOrganization = options.idOrganization || null;
    this.organizationName = options.organizationName || null;
    this.idVehicleAvailabilityException = options.idVehicleAvailabilityException || null;
    this.idInstructor = options.idInstructor || null;
    this.instructorName = options.instructorName || null;
    this.date = options.date || null;
    this.time = options.time || null;
    this.weekDay = options.weekDay || null;
    this.shift = options.shift || null;
    this.amountOfferedRoom = options.amountOfferedRoom || null;
    this.amountScheduledRoom = options.amountScheduledRoom || null;
    this.amountAvailableRoom = options.amountAvailableRoom || null;
    this.visible = options.visible || null;
    this.enabled = options.enabled || null;
    this.licencePlate = options.licencePlate || null;
  }
}
