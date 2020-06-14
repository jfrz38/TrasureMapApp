import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosDisponiblesPage } from './juegos-disponibles.page';
import { JuegosDisponiblesResolverService } from './juegos-disponibles-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: JuegosDisponiblesPage,
    resolve: {
      data: JuegosDisponiblesResolverService 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosDisponiblesPageRoutingModule {}
