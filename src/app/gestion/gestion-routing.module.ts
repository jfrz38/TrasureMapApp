import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionPage } from './gestion.page';
import { GestionResolverService } from './gestion-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: GestionPage,
    resolve: {
      data: GestionResolverService 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionPageRoutingModule {}
