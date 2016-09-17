import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
import { DashboardModule } from './dashboard/dashboard.module'; 
import { routing } from './app.routing';

@NgModule({
  imports: [
    DashboardModule,
    BrowserModule,
    routing
  ],
  declarations: [ AppComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }

