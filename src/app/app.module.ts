import { MatPaginatorIntl } from '@angular/material/paginator';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './main/components/components.module';
import { ConfigService } from '@config/config.service';
import { CoreModule } from './core/core.module';
import { CustomMatPaginatorService } from './core/services/outros/custom-mat-paginator.service';
import { environment } from './../environments/environment';
import { LoginComponent } from './login/login.component';
import { MainModule } from './main/main.module';
import { AuthService } from '@services/outros/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastComponent } from './main/components/toast/toast.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MainModule,
    CoreModule,
    ComponentsModule,
    ToastrModule.forRoot({
      toastComponent: ToastComponent,
      closeButton: true,
      tapToDismiss: false,
      preventDuplicates: true,
      timeOut: 5000
    })
  ],
  providers: [
    AuthService,
    DatePipe,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [ConfigService], multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorService}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initConfig(configService: ConfigService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      configService.load(environment.CONFIG_FILE)
        .then(
          () => resolve({}))
        .catch(
          () => reject())
    });
  };
}
