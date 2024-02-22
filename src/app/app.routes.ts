import { Route } from '@angular/router';


export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import("./pages/home.component").then((m) => m.HomeComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import("./pages/settings.component").then((m) => m.SettingsComponent)
  },
  {
    path: '*',
    redirectTo: ''
  },
];
