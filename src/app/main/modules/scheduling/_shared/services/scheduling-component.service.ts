import { BehaviorSubject } from 'rxjs';
import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulingComponentService  {

  $schedule = new BehaviorSubject<AgendamentoModel>(null);
  $route = new BehaviorSubject<string>(null);
  $disponibilidade = new BehaviorSubject<any>(null);

  constructor( ) {}

  getSchedule() {
    return this.$schedule.asObservable();
  }

  setSchedule(schedule: AgendamentoModel) {
    this.$schedule.next(schedule);
  }

  getRoute() {
    return this.$route.asObservable();
  }

  setRoute(routeFrom: string) {
    this.$route.next(routeFrom);
  }

  getDisponibilidade() {
    return this.$disponibilidade.asObservable();
  }

  setDisponibilidade(disponibilidade) {
    this.$disponibilidade.next(disponibilidade);
  }

}
