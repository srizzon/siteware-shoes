import { Component, OnInit } from '@angular/core';

import { VehicleAvailabilityCachesModel } from '@models/agendamento-pratico/vehicle-availability-caches.model';

@Component({
  selector: 'app-practical-scheduling-form',
  templateUrl: './practical-scheduling-form.component.html',
  styleUrls: ['./practical-scheduling-form.component.scss']
})
export class PracticalSchedulingFormComponent implements OnInit {

  display: string = 'marcacao';
  agendaSelcionada: VehicleAvailabilityCachesModel;
  exame: any;
  constructor() { }

  ngOnInit(): void {
  }

}
