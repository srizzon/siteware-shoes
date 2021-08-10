import { Directives } from './directives/_directives';
import { Pipes } from './pipes/_pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  exports:[
    Directives,
    MaterialModule,
    FlexLayoutModule,
    NgxMaskModule,
    Pipes,
    ReactiveFormsModule
  ],
  declarations: [
    Directives,
    Pipes,
  ]
})
export class CoreModule { }
