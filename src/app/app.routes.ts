import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import("./home.component").then((m) => m.HomeComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import("./settings.component").then((m) => m.SettingsComponent)
  },
  {
    path: '*',
    redirectTo: ''
  },
];
