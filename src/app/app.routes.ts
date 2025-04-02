import { Routes } from '@angular/router';

export const RouteName = {
  catalog: 'catalog',
  event: 'event',
} as const;

export type RouteName = (typeof RouteName)[keyof typeof RouteName];

export const routes: Routes = [
  { path: '', redirectTo: RouteName.catalog, pathMatch: 'full' },
  {
    path: RouteName.catalog,
    loadComponent: () =>
      import('@app/presentation/pages/catalog/catalog.component'),
  },
  {
    path: `${RouteName.event}/:id`,
    loadComponent: () =>
      import('@app/presentation/pages/event-info/event-info.component'),
  },
  { path: '**', redirectTo: RouteName.catalog, pathMatch: 'full' },
];
