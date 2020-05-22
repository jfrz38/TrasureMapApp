import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticiparPage } from './participar.page';

const routes: Routes = [
  {
    path: '',
    component: ParticiparPage,
    children:[
      {
        path:'juegosDisponibles',
        children:[
          {
            path: '',
            loadChildren: () => import('../juegos-disponibles/juegos-disponibles.module').then( m => m.JuegosDisponiblesPageModule)
          }
        ]
      },
      {
        path:'juegosCompletados',
        children:[
          {
            path: '',
            loadChildren: () => import('../juegos-completados/juegos-completados.module').then( m => m.JuegosCompletadosPageModule)
          }
        ]
      },
      {
        path:'estadisticas',
        children:[
          {
            path: '',
            loadChildren: () => import('../estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
          }
        ]
      },
      {
        path:'',
        redirectTo:'/participar/juegosDisponibles',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticiparPageRoutingModule {}
