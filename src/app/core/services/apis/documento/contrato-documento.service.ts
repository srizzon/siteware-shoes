import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceProvisionContract } from '@models/documento/service-provision-contract.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class ContratoDocumentoService {

  private readonly url = `${this.helpConfig.DOCUMENT_API}contratos`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getPrestacaoServicos(serviceProvisionContract: ServiceProvisionContract): Observable<ServiceProvisionContract> {
    const END_POINT = 'prestacaoservicos';

    return this.httpClient.post<ServiceProvisionContract>(`${this.url}/${END_POINT}`, serviceProvisionContract, { responseType: 'blob' as 'json' });
  }
}
