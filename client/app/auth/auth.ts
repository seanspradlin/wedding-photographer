import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    FormsModule,
    HttpModule
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }

