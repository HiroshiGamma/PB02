import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('./rickandmorty/pages/rickandmorty-home/rickandmorty-home.component').then(m => m.RickandmortyHomeComponent)
  }
];