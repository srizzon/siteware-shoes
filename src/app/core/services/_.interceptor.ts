import { ReportService } from './outros/report.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { LogoutType } from './../enums/logout-types.enum';
import { TokenService } from './outros/token.service';
import { UserControllerService } from '@services/outros/user-controller.service';
import { Toast } from './outros/toast.service';
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    private _reportService: ReportService,
    private _toast: Toast,
    private _tokenService: TokenService,
    private _userControllerService: UserControllerService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._tokenService.getToken()) {

      const token = this._tokenService.getToken().access_token;

      let newReq = null;

      if (this._reportService.getReport()) {
        const type = this._reportService.getTypeReport();
        newReq = req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + token).append('Accept', type),
          responseType: 'blob'
        })
        this._reportService.clear()
      } else {
        newReq = req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + token)
        })
      }


      return next.handle(
        newReq
      ).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // LOCAL PARA VERIFICAR ALGUMA LOGICA NA RESPOSTA
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err)
          if (err.status === 401) {
            this._userControllerService.logout(LogoutType.Unauthorized);
          } else {
            if (err && err.status == 400) {
              if (err.error.message) {
                this._toast.warning('Alerta', err.error.message);
              } else {
                this._toast.warning('Alerta', 'Não foi possível processar sua solicitação.');
              }
            }
            else if (err && err.status == 404) {
              if (err.error.message) {
                this._toast.info('Alerta', err.error.message);
              } else {
                this._toast.info('Alerta', 'Não foram encontrados dados para sua solicitação.');
              }
            }
            else if (err && err.status == 500) {
              if (err.error.message) {
                this._toast.error('Erro', err.error.message);
              } else {
                this._toast.error('Erro', 'Não foi possível processar sua solicitação.');
              }
            } else {
              this._toast.error('Erro', 'Não foi possível processar sua solicitação.');
            }
          }
        }
      }));
    }
    // NÃO ESTÁ LOGADO. CONTINUA SEM ADICIONAR HEADER.
    return next.handle(req);
  }
}
