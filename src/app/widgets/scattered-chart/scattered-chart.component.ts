import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType, Point } from 'chart.js';

@Component({
  selector: 'scatter-chart',
  templateUrl: './scattered-chart.component.html',
  styleUrls: [ './scattered-chart.component.css' ]
})
export class ScatteredChartComponent {
  ngOnInit(){
    this.inicializar();
  }
  inicializar(){
    this.scatterChartData.datasets = [];
    
    console.log("Recibiendo datasets camas libres: ", this.camasLibres);

    this.scatterChartData.datasets.push({
      data: this.camasLibres.map( (c):Point => ({ x: c.x, y: c.y }) ),
      label: 'Libre',
      backgroundColor: 'rgb(93, 121, 99)',
      pointRadius: 10
    });
    this.scatterChartData.datasets.push({
      data: this.camasOcupadas.sort( (a,b) => a.x-b.x).filter(a=> a.x<10),
      label: 'Ocupado',
      backgroundColor: 'rgb(176, 48, 96)',
      pointRadius: 10
    })

    this.camasLibres  .filter(r => r.x == 0).map(r => this.etiquetas.push(r.y.toString()));
    this.camasOcupadas.filter(r => r.x == 0).map(r => this.etiquetas.push(r.y.toString()));

  }

  etiquetas : string[] = [];     //  x : fecha, y : id
  @Input() camasLibres   : [ data : {x: number, y : number}] = [{x: 0, y : 0}];
  @Input() camasOcupadas : [ data : {x: number, y : number}] = [{x: 1, y : 1}];

  // scatter
  public scatterChartOptions: ChartConfiguration['options'] = {
    plugins:{
      legend: {
        display : false
      }
    },
    responsive: true,
    scales: {
      y: {
        type: "category",
        labels: this.etiquetas
      }
    }
  };
  public scatterChartLabels: string[] = [ ];
 
  public scatterChartData: ChartData<'scatter'> = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 1, y: 2 },
          { x: 6, y: 5 },
          { x: 1, y: 5 },
          { x: 2, y: 3 },
          { x: 8, y: 6 },
        ],
        label: 'Series A',
        pointRadius: 10,
      },
    ]
  };
  public scatterChartType: ChartType = 'scatter';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  generarRandoms(){
    // Uniformes entre -1 y 1 ? 
    //                     * (max-min) + min
    let randoms : number[] = [];
    this.scatterChartData.datasets = [];
    randoms.push(Math.random() * (1 - (-1)) + (-1));

    for(let i = 0 ; i<20 ; i++){
      
      this.scatterChartData.datasets.push({
        data: [{x: Math.random(), y : Math.random()}],
        label: 'Random',
        pointRadius: 10
      })
    }

    console.log(randoms);
  }
}