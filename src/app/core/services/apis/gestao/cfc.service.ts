import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CfcModel } from '@models/gestao/cfc.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root'
})
export class CfcService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}cfcs`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAllCfcs(params?: {[param: string]: string}): Observable<CfcModel[]> {
    return this.httpClient.get<CfcModel[]>(`${this.url}`, { params });
  }

  getCfcById(id: string): Observable<CfcModel[]> {
    return this.httpClient.get<CfcModel[]>(`${this.url}?id=${id}`);
  }

  createCfc(cfc: CfcModel): Observable<CfcModel> {
    return this.httpClient.post<CfcModel>(`${this.url}`, cfc);
  }

  updateCfc(cfc: CfcModel): Observable<CfcModel> {
    return this.httpClient.put<CfcModel>(`${this.url}`, cfc);
  }

  deleteCfc(cfcId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}?id=${cfcId}`);
  }
}
