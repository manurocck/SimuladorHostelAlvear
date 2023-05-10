import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ChartHabitacionComponent } from './chart-habitacion/chart-habitacion.component';
import { ModalComponent } from './modal/modal.component';
import { ClockComponent } from './clock/clock.component';
import { ChartGananciasComponent } from './chart-ganancias/chart-ganancias.component';
import { ChartOcupacionComponent } from './chart-ocupacion/chart-ocupacion.component';


@NgModule({
  declarations: [
    ChartHabitacionComponent,
    ModalComponent,
    ClockComponent,
    ChartGananciasComponent,
    ChartOcupacionComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    WidgetsRoutingModule
  ],
  exports: [
    ChartOcupacionComponent,
    ChartHabitacionComponent,
    ChartGananciasComponent,
    ClockComponent
  ]
})
export class WidgetsModule { }
