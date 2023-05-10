import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GananciaHabitacion } from 'src/app/structs/structs';

@Component({
  selector: 'chart-ganancias',
  templateUrl: './chart-ganancias.component.html',
  styleUrls: ['./chart-ganancias.component.css']
})
export class ChartGananciasComponent implements OnInit {

  ngOnInit(){
    this.inicializar()
  }
  paletaColores : string[] = [
    '84, 71, 140',
    '44, 105, 154',
    '4, 139, 168',
    '13, 179, 158',
    '22, 219, 147',
    '131, 227, 119',
    '185, 231, 105',
    '239, 234, 90',
    '241, 196, 83',
    '242, 158, 76', 
  ];


  @Input()
  resultadosGanancias : GananciaHabitacion[] = [];
  
  lineChartData : ChartConfiguration['data'] = {
    datasets : [],
    labels : [],
  };
  lineChartTotalData : ChartConfiguration['data'] = {
    datasets : [],
    labels : [],
  };

  inicializar(){
    if(this.resultadosGanancias.length>0){
      let habitaciones:number[] = [];
      let cantidadMeses = this.resultadosGanancias.filter( r => r.numHab == 1).length;

      // let chartConfiguracion : ChartConfiguration['data'] = {
      //   datasets : [],
      //   labels : []
      // };
      
      this.resultadosGanancias.forEach( res => !habitaciones.includes(res.numHab)? habitaciones.push(res.numHab) : '' );
      let cantidadHabitaciones = habitaciones.length;
      let sumaTotalMeses : number[] = [];
      
      // GANANCIA TOTAL
      for(let i=0; i<cantidadHabitaciones ; i++){
        let sumaTotalMes = 0;
        for (let j = i*(cantidadHabitaciones) ; j<(cantidadHabitaciones*(i+1)) ; j++){
          sumaTotalMes += this.resultadosGanancias[i].ganancia;
        }
        sumaTotalMeses.push(sumaTotalMes);
      }

        this.lineChartTotalData.datasets.push(
        {
          data: sumaTotalMeses,
          label: 'Ganancia',
          backgroundColor:       'rgba(131, 227, 119,0.1)',
          borderColor:           'rgba(131, 227, 119,1)',
          pointBackgroundColor:  'rgba(131, 227, 119,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(131, 227, 119,0.5)',
          fill: 'origin',
        }
        )

      habitaciones.forEach( (num, index) => 
        {
          // let indicePaleta = (index!=0)? this.paletaColores.length%index : 0;
          let colorHab = this.paletaColores[index%this.paletaColores.length];
          let gananciasHab = this.resultadosGanancias.sort( (a,b) => (a.numHab - b.numHab) ).filter( r => r.numHab == num).map(r => r.ganancia);
          // console.log("HAB",num);
          // console.log(gananciasHab);
          this.lineChartData.datasets.push(
          {
            data: gananciasHab,
            label: 'Habitacion '+num,
            backgroundColor:       'rgba('+colorHab+',0.1)',
            borderColor:           'rgba('+colorHab+',1)',
            pointBackgroundColor:  'rgba('+colorHab+',1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba('+colorHab+',0.5)',
            fill: 'origin',
          }
          )
        }
        )

      for( let i = 0; i< cantidadMeses; i++) this.lineChartData.labels?.push("Mes "+(i+1).toString())
      // console.log("DEBUG 2");
      // console.log(this.lineChartData);
      // this.lineChartData = chartConfiguracion;
    }
    
    
    return;
  }


  private newLabel? = 'New label';

  // public lineChartData: ChartConfiguration['data'] = {
  //   datasets: [
  //     {
  //       data: [ 65, 59, 80, 81, 56, 55, 40 ],
  //       label: 'Series A',
  //       backgroundColor: 'rgba(148,159,177,0.2)',
  //       borderColor: 'rgba(148,159,177,1)',
  //       pointBackgroundColor: 'rgba(148,159,177,1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  //       fill: 'origin',
  //     },
  //     {
  //       data: [ 28, 48, 40, 19, 86, 27, 90 ],
  //       label: 'Series B',
  //       backgroundColor: 'rgba(77,83,96,0.2)',
  //       borderColor: 'rgba(77,83,96,1)',
  //       pointBackgroundColor: 'rgba(77,83,96,1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgba(77,83,96,1)',
  //       fill: 'origin',
  //     },
  //     {
  //       data: [ 180, 480, 770, 90, 1000, 270, 400 ],
  //       label: 'Series C',
  //       yAxisID: 'y1',
  //       backgroundColor: 'rgba(255,0,0,0.3)',
  //       borderColor: 'red',
  //       pointBackgroundColor: 'rgba(148,159,177,1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  //       fill: 'origin',
  //     }
  //   ],
  //   labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  // };
 

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          title: {
            text: 'Ganancias en dólares',
            display: true,
          },
          position: 'left',
        },
      // y1: {
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(207, 199, 210,0.3)',
      //   },
      //   ticks: {
      //     color: 'rgba(207, 199, 210,1)'
      //   }
      // }
    },
    plugins: {
      legend: {
        display: true,
        position : 'bottom',
       },
    }
  };
  
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  // public pushOne(): void {
  //   this.lineChartData.datasets.forEach((x, i) => {
  //     // const num = LineChartComponent.generateNumber(i);
  //     // x.data.push(num);
  //   });
  //   this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

  //   this.chart?.update();
  // }

  // public changeColor(): void {
  //   this.lineChartData.datasets[2].borderColor = 'green';
  //   this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

  //   this.chart?.update();
  // }

  // public changeLabel(): void {
  //   const tmp = this.newLabel;
  //   this.newLabel = this.lineChartData.datasets[2].label;
  //   this.lineChartData.datasets[2].label = tmp;

  //   this.chart?.update();
  // }

}
