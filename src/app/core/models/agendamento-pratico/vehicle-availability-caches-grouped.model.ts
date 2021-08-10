import { VehicleAvailabilityCachesModel } from '@models/agendamento-pratico/vehicle-availability-caches.model';
export class VehicleAvailabilityCachesGroupedModel {
  category?: string;
  licencePlate?: string;
  idVehicle?: number;
  date?: any;
  totalAmountOfferedRoom?: number;
  totalAmountScheduledRoom?: number;
  totalAmountAvailableRoom?: number;
  vehicleAvailabilityCaches?: VehicleAvailabilityCachesModel[];

  constructor(options: VehicleAvailabilityCachesGroupedModel = {}) {
    this.category = options.category || null;
    this.licencePlate = options.licencePlate || null;
    this.idVehicle = options.idVehicle || null;
    this.date = options.date || null;
    this.totalAmountOfferedRoom = options.totalAmountOfferedRoom || null;
    this.totalAmountScheduledRoom = options.totalAmountScheduledRoom || null;
    this.totalAmountAvailableRoom = options.totalAmountAvailableRoom || null;
    this.vehicleAvailabilityCaches = options.vehicleAvailabilityCaches || null;
  }
}
