import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { MatriculaGestaoModel, MatriculaRequest } from '@models/gestao/matricula-gestao.model';
import { CargaRenachModel } from '@core/models/gestao/carga-renach.model';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {

  private readonly url = `${this.helpConfig.MANAGEMENT_API}matriculas`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) {}

  getAll(params?: {[param: string]: any }): Observable<any> {
    return this.httpClient.get<MatriculaGestaoModel[]>(`${this.url}`, { params });
  }


  getById(id: number): Observable<MatriculaGestaoModel> {
    return this.httpClient.get<MatriculaGestaoModel>(`${this.url}/${id}`);
  }

  update(matricula: any): Observable<MatriculaRequest> {
    return this.httpClient.put<MatriculaRequest>(`${this.url}`, matricula);
  }

  create(matricula: MatriculaRequest): Observable<MatriculaRequest> {
    return this.httpClient.post<MatriculaRequest>(`${this.url}`, matricula);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }

  cancel(id: number, comments: string): Observable<MatriculaGestaoModel> {
    return this.httpClient.delete<MatriculaGestaoModel>(
      `${this.url}/${id}?motivo=${comments}`
    );
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<MatriculaGestaoModel[]>(`${this.url}${END_POINT}`, { params });
  }

  getCargaRenach(params: string): Observable<CargaRenachModel> {
    const END_POINT = '/cargarenach'
    return this.httpClient.post<CargaRenachModel>(`${this.url}${END_POINT}?${params}`, null);
  }
}
