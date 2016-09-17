import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '',
    component: AccountComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },
]);
