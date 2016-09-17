import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './account.component';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [ FormsModule, HttpModule, routing ],
  declarations: [ LoginComponent, LogoutComponent ]
})
export class AccountModule { }

