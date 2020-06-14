import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosCompletadosPage } from './juegos-completados.page';
import { JuegosCompletadosResolverService } from './juegos-completados-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: JuegosCompletadosPage,
    resolve: {
      data: JuegosCompletadosResolverService 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosCompletadosPageRoutingModule {}
