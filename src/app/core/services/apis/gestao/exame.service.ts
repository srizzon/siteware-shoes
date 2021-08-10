import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { ConstantModel } from '@models/outros/constant.model';
@Injectable({
  providedIn: 'root'
})
export class ExameService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}exames`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string}): Observable<ConstantModel[]> {
    return this.httpClient.get<ConstantModel[]>(`${this.url}`, { params });
  }
}
