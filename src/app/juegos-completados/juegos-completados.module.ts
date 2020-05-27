import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosCompletadosPageRoutingModule } from './juegos-completados-routing.module';

import { JuegosCompletadosPage } from './juegos-completados.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosCompletadosPageRoutingModule
  ],
  declarations: [JuegosCompletadosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JuegosCompletadosPageModule {}
