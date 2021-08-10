import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CfcAgendamentoModel } from '@core/models/agendamento/cfc-agendamento.model';
import { CfcModel } from '@models/gestao/cfc.model';
import { ConstantModel } from '@models/outros/constant.model';
import { CursoAgendamentoModel } from '@models/agendamento/curso-agendamento.model';
import { InstrutorAgendamentoModel } from '@core/models/agendamento/instrutor-agendamento.model';
import { InstrutorModel } from '@models/gestao/instrutor.model';
import { LocalModel } from '@core/models/gestao/local.model';
import { ServicoAgendamentoModel } from '@models/agendamento/servico-agendamento.model';
import { ServicoGestaoModel } from '@models/gestao/servico-gestao.model';
import { UnidadeDetran } from '@models/gestao/unidade-detran.model';
import { VeiculoCfcModel } from '@models/gestao/veiculo-cfc.model';
@Injectable({
  providedIn: 'root'
})
export class ServicesSubject {

  private _cfcAgendamentoSubject$ = new BehaviorSubject<CfcAgendamentoModel[]>(null);
  private _cfcSubject$ = new BehaviorSubject<CfcModel[]>(null);
  private _instrutorAgendamentoSubject$ = new BehaviorSubject<InstrutorAgendamentoModel[]>(null);
  private _instrutorSubject$ = new BehaviorSubject<InstrutorModel[]>(null);
  private _locaisSubject$ = new BehaviorSubject<LocalModel[]>(null);
  private _servicoAgendamentoSubject$ = new BehaviorSubject<ServicoAgendamentoModel[]>(null);
  private _servicosSubject$ = new BehaviorSubject<ServicoGestaoModel[]>(null);
  private _tipoExameSubject$ = new BehaviorSubject<ConstantModel[]>(null);
  private _unidadeDetran$ = new BehaviorSubject<UnidadeDetran[]>(null);
  private _veiculoSubject$ = new BehaviorSubject<VeiculoCfcModel[]>(null);
  private _cursoAgendamentoSubject$ = new BehaviorSubject<CursoAgendamentoModel[]>(null);
  private _cfcs: CfcModel[] = new Array<CfcModel>();
  private _servicos: ServicoGestaoModel[] = new Array<ServicoGestaoModel>();
  private _instrutores: InstrutorModel[] = new Array<InstrutorModel>();

  constructor(
  ) {}

  getCfcsList(): CfcModel[] {
    return this._cfcs;
  }

  getCfcs(): Observable<CfcModel[]> {
    return this._cfcSubject$.asObservable();
  }

  setCfc(cfcs: CfcModel[]): void {
    this._cfcs = cfcs;
    this._cfcSubject$.next(cfcs);
  }

  getCfcsAgendamento(): Observable<CfcAgendamentoModel[]> {
    return this._cfcAgendamentoSubject$.asObservable();
  }

  setCfcAgendamento(cfcs: CfcAgendamentoModel[]): void {
    this._cfcs = cfcs;
    this._cfcAgendamentoSubject$.next(cfcs);
  }

  getCursoAgendamento(): Observable<CursoAgendamentoModel[]> {
    return this._cursoAgendamentoSubject$.asObservable();
  }

  setCursoAgendamento(cfcs: CursoAgendamentoModel[]): void {
    this._cursoAgendamentoSubject$.next(cfcs);
  }

  getInstrutorList(): Array<InstrutorModel> {
    return this._instrutores
  }

  getInstrutor(): Observable<InstrutorModel[]> {
    return this._instrutorSubject$.asObservable();
  }

  setInstrutor(instrutor: InstrutorModel[]): void {
    this._instrutores = instrutor;
    this._instrutorSubject$.next(instrutor);
  }

  getInstrutorAgendamento(): Observable<InstrutorAgendamentoModel[]> {
    return this._instrutorAgendamentoSubject$.asObservable();
  }

  setInstrutorAgendamento(instrutor: InstrutorAgendamentoModel[]): void {
    this._instrutorAgendamentoSubject$.next(instrutor);
  }

  getLocal(): Observable<LocalModel[]> {
    return this._locaisSubject$.asObservable();
  }

  setLocal(locais: LocalModel[]) {
    this._locaisSubject$.next(locais);
  }

  getServicos(): Observable<ServicoGestaoModel[]> {
    return this._servicosSubject$.asObservable();
  }

  getServicosList(): Array<ServicoGestaoModel> {
    return this._servicos;
  }

  setServicos(servicos: ServicoGestaoModel[]) {
    this._servicos = servicos;
    this._servicosSubject$.next(servicos);
  }

  getServicoAgendamento(): Observable<ServicoAgendamentoModel[]> {
    return this._servicoAgendamentoSubject$.asObservable();
  }

  setServicoAgendamento(servicos: ServicoAgendamentoModel[]) {
    this._servicoAgendamentoSubject$.next(servicos);
  }

  getTipoExame(): Observable<ConstantModel[]> {
    return this._tipoExameSubject$.asObservable();
  }

  setTipoExame(tipoExame: ConstantModel[]) {
    this._tipoExameSubject$.next(tipoExame);
  }

  getUnidadeDetran(): Observable<UnidadeDetran[]> {
    return this._unidadeDetran$.asObservable();
  }

  setUnidadeDetran(unidadeDetran: UnidadeDetran[]): void {
    this._unidadeDetran$.next(unidadeDetran);
  }

  getVeiculo(): Observable<VeiculoCfcModel[]> {
    return this._veiculoSubject$.asObservable();
  }

  setVeiculo(veiculo: VeiculoCfcModel[]): void {
    this._veiculoSubject$.next(veiculo);
  }
}
