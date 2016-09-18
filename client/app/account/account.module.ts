import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './account.routing';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

import { AccountService } from './account.service';

@NgModule({
  imports: [ FormsModule, HttpModule, routing ],
  declarations: [ AccountComponent, LoginComponent, LogoutComponent ],
  exports: [ AccountComponent ],
  providers: [ AccountService ]
})
export class AccountModule { }

