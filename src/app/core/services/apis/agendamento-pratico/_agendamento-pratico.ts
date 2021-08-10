import { AgendamentoPraticoResolver } from './resolvers/_agendamento-resolvers';
import { SchedulePracticalsService } from './schedule-practicals.service';
import { VehicleAvailabilityCachesService } from '@services/apis/agendamento-pratico/vehicle-availability-caches.service';
import { VehicleService } from './vehicles.service';

export const AgendamentoPraticoServices = [
  AgendamentoPraticoResolver,
  SchedulePracticalsService,
  VehicleService,
  VehicleAvailabilityCachesService

]
