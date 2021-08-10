import { SchedulePracticalById } from './schedule-practical-by-id.resolver';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleByIdResolver } from './vehicle-by-id.resolver';

export const AgendamentoPraticoResolver = [
  SchedulePracticalById,
  VehicleResolver,
  VehicleByIdResolver
]
