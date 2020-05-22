import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosCompletadosPageRoutingModule } from './juegos-completados-routing.module';

import { JuegosCompletadosPage } from './juegos-completados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosCompletadosPageRoutingModule
  ],
  declarations: [JuegosCompletadosPage]
})
export class JuegosCompletadosPageModule {}
