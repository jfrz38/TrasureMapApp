import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticiparPageRoutingModule } from './participar-routing.module';

import { ParticiparPage } from './participar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticiparPageRoutingModule
  ],
  declarations: [ParticiparPage]
})
export class ParticiparPageModule {}
