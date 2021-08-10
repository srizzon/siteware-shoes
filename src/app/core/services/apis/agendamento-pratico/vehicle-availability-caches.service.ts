import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { VehicleAvailabilityCachesModel } from '@models/agendamento-pratico/vehicle-availability-caches.model';
import { VehicleAvailabilityCachesGroupedModel } from '@models/agendamento-pratico/vehicle-availability-caches-grouped.model';
@Injectable({
  providedIn: 'root',
})
export class VehicleAvailabilityCachesService {

  private readonly _url = `${this._helpConfig.PRACTICAL_SCHEDULING_API}vehicleavailabilitycache`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  getAll(params?: { [param: string]: any }): Observable<VehicleAvailabilityCachesModel[]> {
    return this._httpClient.get<VehicleAvailabilityCachesModel[]>(`${this._url}`, { params });
  }

  getAllGrouped(params?: { [param: string]: any }): Observable<VehicleAvailabilityCachesGroupedModel[]> {
    const END_POINT = `${this._url}/grouped`
    return this._httpClient.get<VehicleAvailabilityCachesGroupedModel[]>(END_POINT, { params });
  }

  getById(id: string): Observable<VehicleAvailabilityCachesModel> {
    const END_POINT = `${this._url}/${id}`
    return this._httpClient.get<VehicleAvailabilityCachesModel>(END_POINT);
  }

  getByOrganization(id: string): Observable<VehicleAvailabilityCachesModel> {
    const END_POINT = `${this._url}/organization/${id}`
    return this._httpClient.get<VehicleAvailabilityCachesModel>(`${END_POINT}`);
  }

  getByInstructor(id: string): Observable<VehicleAvailabilityCachesModel> {
    const END_POINT = `${this._url}/instructor/${id}`
    return this._httpClient.get<VehicleAvailabilityCachesModel>(`${END_POINT}`);
  }

}

const horarios = [
  {
    category: "B",
    idVehicle: 1,
    licencePlate: "GGV-9F58",
    amountAvailableRoom: 4,
    amountOfferedRoom: 1,
    amountScheduledRoom: 0,
    dateTime: "2021-07-06T08:00:00",
    enabled: true,
    idVehicleAvailability: 1,
    idVehicleAvailabilityException: null,
    shift: "MANHA",
    visible: true,
    weekDay: "QUARTA-FEIRA",
    vehicleAvailabilityCaches: [
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T08:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T09:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T10:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T11:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
    ]
  },
  {
    category: "B",
    idVehicle: 1,
    licencePlate: "ABC-1234",
    amountAvailableRoom: 4,
    amountOfferedRoom: 1,
    amountScheduledRoom: 0,
    dateTime: "2021-07-06T08:00:00",
    enabled: true,
    idVehicleAvailability: 1,
    idVehicleAvailabilityException: null,
    shift: "MANHA",
    visible: true,
    weekDay: "QUARTA-FEIRA",
    vehicleAvailabilityCaches: [
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T08:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "ABC-1234",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T09:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "ABC-1234",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T10:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "ABC-1234",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-06T11:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "ABC-1234",
        shift: "MANHA",
        visible: true,
      },
    ]
  },
  {
    category: "B",
    idVehicle: 1,
    licencePlate: "GGV-9F58",
    amountAvailableRoom: 4,
    amountOfferedRoom: 1,
    amountScheduledRoom: 0,
    dateTime: "2021-07-07T08:00:00",
    enabled: true,
    idVehicleAvailability: 1,
    idVehicleAvailabilityException: null,
    shift: "MANHA",
    visible: true,
    weekDay: "QUARTA-FEIRA",
    vehicleAvailabilityCaches: [
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-07T08:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-07T09:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-07T10:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
      {
        amountAvailableRoom: 1,
        amountOfferedRoom: 1,
        amountScheduledRoom: 0,
        category: "B",
        dateTime: "2021-07-07T11:00:00",
        enabled: true,
        id: 1,
        idInstructor: 1,
        idOrganization: 1,
        idVehicle: 1,
        idVehicleAvailability: 1,
        idVehicleAvailabilityException: null,
        licencePlate: "GGV-9F58",
        shift: "MANHA",
        visible: true,
      },
    ]

  }
]
