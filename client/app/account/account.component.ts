import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'account', component: LoginComponent },
  { path: 'account/logout', component: LogoutComponent }
]);
