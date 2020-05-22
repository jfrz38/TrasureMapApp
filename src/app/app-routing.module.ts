import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'gestion',
    loadChildren: () => import('./gestion/gestion.module').then( m => m.GestionPageModule)
  },
  {
    path: 'participar',
    loadChildren: () => import('./participar/participar.module').then( m => m.ParticiparPageModule)
  },
  {
    path: 'juego/:type/:id',
    loadChildren: () => import('./juego/juego.module').then( m => m.JuegoPageModule)
  },
  {
    path: 'juegos-disponibles',
    loadChildren: () => import('./juegos-disponibles/juegos-disponibles.module').then( m => m.JuegosDisponiblesPageModule)
  },
  {
    path: 'juegos-completados',
    loadChildren: () => import('./juegos-completados/juegos-completados.module').then( m => m.JuegosCompletadosPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'singup',
    loadChildren: () => import('./singup/singup.module').then( m => m.SingupPageModule)
  },
  {
    path: 'partida/:type/:id',
    loadChildren: () => import('./partida/partida.module').then( m => m.PartidaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
