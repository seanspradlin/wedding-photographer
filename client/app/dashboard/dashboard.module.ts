import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';

@NgModule({
  imports: [ routing ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
