import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ScatteredChartComponent } from './scattered-chart/scattered-chart.component';


@NgModule({
  declarations: [
    ScatteredChartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    WidgetsRoutingModule
  ],
  exports: [
    ScatteredChartComponent
  ]
})
export class WidgetsModule { }
