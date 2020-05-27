import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosDisponiblesPageRoutingModule } from './juegos-disponibles-routing.module';

import { JuegosDisponiblesPage } from './juegos-disponibles.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosDisponiblesPageRoutingModule
  ],
  declarations: [JuegosDisponiblesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JuegosDisponiblesPageModule {}
