import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceProvisionReceipt } from '@models/documento/service-provision-receipt.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class RecibosService {

  private readonly url = `${this.helpConfig.DOCUMENT_API}recibos`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getPrestacaoServicos(serviceProvisionReceipt: ServiceProvisionReceipt): Observable<ServiceProvisionReceipt> {
    const END_POINT = 'prestacaoservicos';

    return this.httpClient.post<ServiceProvisionReceipt>(`${this.url}/${END_POINT}`, serviceProvisionReceipt, { responseType: 'blob' as 'json' });
  }
}
