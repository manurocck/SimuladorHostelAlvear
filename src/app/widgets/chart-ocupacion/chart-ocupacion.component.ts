
import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'chart-ocupacion',
  templateUrl: './chart-ocupacion.component.html',
  styleUrls: ['./chart-ocupacion.component.css']
})
export class ChartOcupacionComponent {

  @Input() ocupacionPorMes : number[] = [33,44,2];

  dataPorMes(mes : number) : ChartData<'doughnut'>{
    // console.log("OCUPACION POR MES");
    // console.log(this.ocupacionPorMes);
    
    // console.log("Mes"+mes.toString());
    // console.log(this.ocupacionPorMes[mes]);
    

    return  {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.ocupacionPorMes[mes-1], (100-(this.ocupacionPorMes[mes-1])) ] }
      ]
    };
  }

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Ocupado', 'Libre' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.ocupacionPorMes },
      { data: [ 50, 150, 120 ] },
      { data: [ 250, 130, 70 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  // public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
}