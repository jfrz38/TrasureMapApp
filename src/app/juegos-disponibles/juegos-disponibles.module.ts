import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosDisponiblesPageRoutingModule } from './juegos-disponibles-routing.module';

import { JuegosDisponiblesPage } from './juegos-disponibles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosDisponiblesPageRoutingModule
  ],
  declarations: [JuegosDisponiblesPage]
})
export class JuegosDisponiblesPageModule {}
