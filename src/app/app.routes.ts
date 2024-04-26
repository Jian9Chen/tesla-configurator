import { Routes } from '@angular/router';
import {canActivateCarConfiguration, canActivateSummary} from "./guards/guards";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'choose-model',
    pathMatch: 'full'
  },
  {
    path: 'choose-model',
    loadComponent: () => import('./pages/models/models.component').then(mod => mod.ModelsComponent)
  },
  {
    path: 'choose-options',
    loadComponent: () => import('./pages/options/options.component').then(mod => mod.OptionsComponent),
    canActivate: [canActivateCarConfiguration]
  },
  {
    path: 'summary',
    loadComponent: () => import('./pages/price-summary/price-summary.component').then(mod => mod.PriceSummaryComponent),
    canActivate: [canActivateSummary]
  },
  {
    path: "**",
    redirectTo: 'choose-model'
  }
];
