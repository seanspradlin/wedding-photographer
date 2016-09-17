import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routing: ModuleWithProviders = RouterModule.forRoot([
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'account', loadChildren: 'app/account/account.module#AccountModule'}
]);
