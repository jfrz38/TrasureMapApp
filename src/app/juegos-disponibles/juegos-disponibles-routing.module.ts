import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosDisponiblesPage } from './juegos-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosDisponiblesPageRoutingModule {}
