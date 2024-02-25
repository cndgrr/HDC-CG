import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./balance-page.components').then((m) => m.BalancePageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
