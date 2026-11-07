import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Posts — Posts & Views',
    loadComponent: () => import('./pages/lista/lista').then((m) => m.Lista),
  },
  {
    path: 'post/:id',
    title: 'Detalle del post — Posts & Views',
    loadComponent: () => import('./pages/detalle/detalle').then((m) => m.Detalle),
  },
  {
    path: 'perfil',
    title: 'Perfil — Posts & Views',
    loadComponent: () => import('./pages/perfil/perfil').then((m) => m.PerfilPagina),
  },
  {
    path: 'info',
    title: 'Información — Posts & Views',
    loadComponent: () => import('./pages/info/info').then((m) => m.Info),
  },
  {
    path: '**',
    title: 'Página no encontrada — Posts & Views',
    loadComponent: () =>
      import('./pages/no-encontrado/no-encontrado').then((m) => m.NoEncontrado),
  },
];
