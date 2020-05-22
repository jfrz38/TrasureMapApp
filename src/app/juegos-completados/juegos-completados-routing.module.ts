import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosCompletadosPage } from './juegos-completados.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosCompletadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosCompletadosPageRoutingModule {}
