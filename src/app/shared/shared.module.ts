import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbBadgeModule,
} from '@nebular/theme';

import { HeaderComponent } from './components/header/header.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedRoutingModule } from './shared-routing.module';

const MODULES = [
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule
  // NbMenuModule,
  // NbUserModule,
  // NbActionsModule,
  // NbSearchModule,
  // NbSidebarModule,
  // NbContextMenuModule,
  // NbButtonModule,
  // NbSelectModule,
  // NbIconModule,
  // NbEvaIconsModule,
];

const COMPONENTS = [
  HeaderComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MODULES],
  exports: [...COMPONENTS]
})
export class SharedModule { }
