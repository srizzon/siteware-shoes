export class SchedulePracticalsModel {
  id?: number;
  idVehicleAvailability?: number;
  idVehicle?: number;
  idInstructor?: number;
  idOrganization?: number;
  idStudentEnrollment?: number;
  dateTime?: any;
  enabled?: boolean;
  instructor?: Instructor;
  vehicle?: Vehicle;
  vehicleAvailability?: VehicleAvailability;
  studentEnrollment?: StudentEnrollment;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;
  constructor(options: SchedulePracticalsModel = {}) {
    this.id = options.id || null;
    this.idVehicleAvailability = options.idVehicleAvailability || null;
    this.idVehicle = options.idVehicle || null;
    this.idInstructor = options.idInstructor || null;
    this.idOrganization = options.idOrganization || null;
    this.idStudentEnrollment = options.idStudentEnrollment || null;
    this.dateTime = options.dateTime || null;
    this.enabled = options.enabled || null;
    this.instructor = options.instructor || null;
    this.vehicle = options.vehicle || null;
    this.vehicleAvailability = options.vehicleAvailability || null;
    this.studentEnrollment = options.studentEnrollment || null;
    this.createdByUsername = options.createdByUsername || null;
    this.createdDate = options.createdDate || null;
    this.updatedByUsername = options.updatedByUsername || null;
    this.updatedDate = options.updatedDate || null;
  }
}

interface Instructor {
  id?: number;
  name?: string;
  enabled?: boolean;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;
}

interface Vehicle {
  id?: number;
  category?: string;
  licencePlate?: string;
  enabled?: boolean;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;
}

interface VehicleAvailability {
  id?: number;
  idVehicle?: number;
  idOrganization?: number;
  idInstructor?: number;
  time?: string;
  amountAvailableRoom?: number;
  enabled?: boolean;
  instructor?: Instructor;
  vehicle?: Vehicle;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;
}

interface StudentEnrollment {
  id?: number;
  idExternal?: string;
  idStudent?: number;
  idOrganization?: number;
  processNumber?: string;
  enabled?: boolean;
  organization?: Organization;
  student?: Student;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;
}

interface Organization  {
  id?: number;
  name?: string;
  registerNumber?: string;
  locked?: boolean;
  lockedReason?: string;
  enabled?: boolean;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;
}

interface Student {
  id?: number;
  idExternal?: string;
  socialCodeNumber?: string;
  name?: string;
  email?: string;
  birthDate?: any;
  phoneNumber?: string;
  enabled?: boolean;
  createdByUsername?: string;
  createdDate?: any;
  updatedByUsername?: string;
  updatedDate?: any;
}
