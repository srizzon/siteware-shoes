import { Component, OnInit } from '@angular/core';

import { MarcacaoExameDisponibilidadeCache } from '@models/gestao/marcacao-exame-disponibilidade-cache.model';

@Component({
  templateUrl: './scheduling-exams-form.component.html',
  styleUrls: ['./scheduling-exams-form.component.scss']
})
export class SchedulingExamsFormComponent implements OnInit {

  display: string = 'marcacao';
  agendaSelcionada: MarcacaoExameDisponibilidadeCache;
  exame: any;
  constructor() { }

  ngOnInit(): void { }
}
