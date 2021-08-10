import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelpConfig } from '@config/help-config';
import { Observable } from 'rxjs';
import { Produto } from '@models/financeiro/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}produtos`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) {}

  getAll(params?: { [param: string]: string }): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.url}`, { params });
  }

  getById(id: string): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.url}/${id}`);
  }

  create(product: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(`${this.url}`, product);
  }

  update(product: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(`${this.url}`, product);
  }

  delete(productId: number): Observable<string> {
    return this.httpClient.delete<{ id: number, mensagem: string }>(`${this.url}?id=${productId}`).pipe(
      map(({ mensagem }) => mensagem)
    );
  }
}
