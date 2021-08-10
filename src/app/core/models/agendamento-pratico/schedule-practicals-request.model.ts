export class SchedulePraticalsRequestModel {
  createdByUsername?: string;
  createdDate?: any;
  dateTime?: any;
  enabled?: boolean;
  id?: number;
  idVehicleAvailability?: number;
  idVehicle?: number;
  idOrganization?: number;
  idInstructor?: number;
  idStudentEnrollment?: number;
  constructor(options: SchedulePraticalsRequestModel = {}) {
    this.createdByUsername = options.createdByUsername || null;
    this.createdDate = options.createdDate || null;
    this.dateTime = options.dateTime || null;
    this.enabled = options.enabled || null;
    this.id = options.id || null;
    this.idVehicleAvailability = options.idVehicleAvailability || null;
    this.idVehicle = options.idVehicle || null;
    this.idOrganization = options.idOrganization || null;
    this.idInstructor = options.idInstructor || null;
    this.idStudentEnrollment = options.idStudentEnrollment || null;
  }
}
