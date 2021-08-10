import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AllowedGuard } from '@core/guards/allowed.guard';
import { CoreModule } from '@core/core.module';
import { MainRoutingModule } from './main.routing.module';
import { MainComponent } from './main.component';
import { RulesGuard } from '@core/guards/rules.guard';
import { HttpsRequestInterceptor } from '@core/services/_.interceptor';
import { LoadingInterceptor } from './components/loading/loading.interceptor';
import { Services } from '@core/services/_services';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    MainRoutingModule,
    RouterModule
  ],
  declarations: [
    MainComponent
  ],
  providers: [
    Services,
    AllowedGuard,
    RulesGuard,
     [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpsRequestInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true,
      }
    ]
  ]
})
export class MainModule {}
