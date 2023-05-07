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
    
    // console.log("Recibiendo datasets camas libres: ", this.camasLibres);

    this.camasLibres  .filter(r => r.x == 0).map(r => this.etiquetas.push(r.y.toString()));
    this.camasOcupadas.filter(r => r.x == 0).map(r => this.etiquetas.push(r.y.toString()));
    // console.log("Etiquetas : ",this.etiquetas);
    
    this.habitaciones = this.removeDuplicates(this.etiquetas);
    
    // console.log("Habitaciones : ",this.habitaciones);
  }

  habitaciones : number[] = [];

  removeDuplicates(arr : string[]) {
    let unique:number[] = [];

    arr.forEach(e => {
        if (!unique.includes(this.etiquetaAHabitacion(e))) {
            unique.push(this.etiquetaAHabitacion(e));
        }
    });
    return unique;
  }

  etiquetaAHabitacion( etiqueta : string){
    let indiceHabitacion = Math.round(parseInt(etiqueta)/100);

    return indiceHabitacion;
  }

  dataSegunHabitacion( indice : number ){
    var indiceChartData: ChartData<'scatter'> = {
      labels: this.scatterChartLabels,
      datasets: [
        {
          data: this.camasLibres.filter( xy => (xy.y >= indice * 100 && xy.y < (indice+1) * 100) ),
          label: 'Libre',
          backgroundColor: 'rgb(93, 121, 99)',
          pointRadius: 4
        },
        {
          data: this.camasOcupadas.filter( xy => (xy.y >= indice * 100 && xy.y < (indice+1) * 100) ),
          label: 'Ocupados',
          backgroundColor: 'rgb(176, 48, 96)',
          pointRadius: 4
        }
      ]
    };

    return indiceChartData;
  }

  opcionesSegunHabitacion( indice : number){
    var indiceChartOptions: ChartConfiguration['options'] = {
      plugins:{
        legend: {
          display : false
        }
      },
      responsive: true,
      scales: {
        x: {
          min: 0,
          max: 30
        },
        y: {
          min : indice*100-1,
          max : indice*100+6
        }
      }
    };
    return indiceChartOptions;
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
        min : 100,
        max : 102
      }
      // y: {
      //   type: "category",
      //   labels: this.etiquetas
      // }
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

    // console.log(randoms);
  }
}