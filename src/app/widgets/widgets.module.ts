import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ChartHabitacionComponent } from './chart-habitacion/chart-habitacion.component';
import { ModalComponent } from './modal/modal.component';
import { ClockComponent } from './clock/clock.component';
import { ChartGananciasComponent } from './chart-ganancias/chart-ganancias.component';


@NgModule({
  declarations: [
    ChartHabitacionComponent,
    ModalComponent,
    ClockComponent,
    ChartGananciasComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    WidgetsRoutingModule
  ],
  exports: [
    ChartHabitacionComponent,
    ChartGananciasComponent,
    ClockComponent
  ]
})
export class WidgetsModule { }
