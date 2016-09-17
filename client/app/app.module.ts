import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AccountModule } from './account/account';
import { routing } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AccountModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

