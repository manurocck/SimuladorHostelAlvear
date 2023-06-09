import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'chart-habitacion',
  templateUrl: './chart-habitacion.component.html',
  styleUrls: [ './chart-habitacion.component.css' ]
})
export class ChartHabitacionComponent {  
  habitaciones : number[] = []; // Array contenedor de todas las camas sin repetidos
  etiquetas    : string[] = []; // Array contenedor de todas las camas  

  //  x : fecha, y : id
  @Input() camasLibres   : [ data : {x: number, y : number}] = [{x: 0, y : 0}];
  @Input() camasOcupadas : [ data : {x: number, y : number}] = [{x: 1, y : 1}];
  @Input() tiempo = 0;

  
  public scatterChartType: ChartType = 'scatter';
  
  ngOnInit(){
    this.inicializar();
  }
  inicializar(){
    this.camasLibres  .filter(r => r.x == 0).map(r => this.etiquetas.push(r.y.toString()));
    this.camasOcupadas.filter(r => r.x == 0).map(r => this.etiquetas.push(r.y.toString()));
    
    this.habitaciones = this.removeDuplicates(this.etiquetas);
  }

  dataSegunHabitacion( indice : number ){
    var indiceChartData: ChartData<'scatter'> = {
      labels: [],
      datasets: [
        {
          data: this.camasLibres.filter( xy => (xy.y >= indice * 100 && xy.y < (indice+1) * 100) ),
          label: 'Libre',
          backgroundColor: 'rgb(93, 121, 99)',
          pointRadius: 4
        },
        {
          data: this.camasOcupadas.filter( xy => (xy.y >= indice * 100 && xy.y < (indice+1) * 100) ),
          label: 'Ocupado',
          backgroundColor: 'rgb(176, 48, 96)',
          pointRadius: 4
        }
      ]
    };

    return indiceChartData;
  }

  opcionesSegunHabitacion( indice : number){

    let camas : number[] = [];

    this.etiquetas.forEach(e => {
        if (!camas.includes(parseInt(e))) {
            camas.push(parseInt(e));
        }
    });

    let contarCamas = camas.reduce( (pr, cu, i) => cu = pr+((Math.round(camas[i]/100)==indice)?1:0), 0) ;

    var indiceChartOptions: ChartConfiguration['options'] = {
      plugins:{
        legend: {
          // display : false // Para ocultar las etiquetas de libre y ocupado
          position : 'top',
        }
      },
      animation: false,
      responsive: true,
      scales: {
        x: {
          min: Math.round(this.tiempo)-5,
          max: 20+Math.round(this.tiempo),
          title: {
            text: 'Fecha (día)',
            display: true
          },
        },
        y: {
          min : indice*100-1,
          max : indice*100+contarCamas,
          title: {
            text: 'Cama',
            display: true
          },
          ticks : {
            callback: function(value, index, ticks) {
              let text = (value==indice*100-1 || value == indice*100+contarCamas)? '' : value.toString();
              return text;
            },
            stepSize : 1
          }
        }
      }
    };
    return indiceChartOptions;
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

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
}