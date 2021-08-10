import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CursoGestaoModel } from '@models/gestao/curso-gestao.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class CursoGestaoService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}cursos`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getAllCourses(params?: { [param: string]: string }): Observable<CursoGestaoModel[]> {
    return this.httpClient.get<CursoGestaoModel[]>(`${this.url}`, { params });
  }

  createCourse(cfc: CursoGestaoModel): Observable<CursoGestaoModel> {
    return this.httpClient.post<CursoGestaoModel>(`${this.url}`, cfc);
  }

  updateCourse(cfc: CursoGestaoModel): Observable<CursoGestaoModel> {
    return this.httpClient.put<CursoGestaoModel>(`${this.url}`, cfc);
  }

  deleteCourse(courseId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}?id=${courseId}`);
  }
}
