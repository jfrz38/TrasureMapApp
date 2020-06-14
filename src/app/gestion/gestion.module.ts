import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionPageRoutingModule } from './gestion-routing.module';

import { GestionPage } from './gestion.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GestionResolverService } from './gestion-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionPageRoutingModule
  ],
  declarations: [GestionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GestionResolverService]
})
export class GestionPageModule {}
