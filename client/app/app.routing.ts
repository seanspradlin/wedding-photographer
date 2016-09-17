import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routing: ModuleWithProviders = RouterModule.forRoot([
  { path: '', redirectTo: 'account', pathMatch: 'full' }
]);
