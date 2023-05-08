import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ChartHabitacion } from './chart-habitacion/chart-habitacion.component';
import { ModalComponent } from './modal/modal.component';
import { ClockComponent } from './clock/clock.component';


@NgModule({
  declarations: [
    ChartHabitacion,
    ModalComponent,
    ClockComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    WidgetsRoutingModule
  ],
  exports: [
    ChartHabitacion
  ]
})
export class WidgetsModule { }
