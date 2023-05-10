import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dia, Habitacion } from 'src/app/structs/structs';


@Component({
  selector: 'app-formulario-control',
  templateUrl: './formulario-control.component.html',
  styleUrls: ['./formulario-control.component.css']
})
export class FormularioControlComponent implements OnInit {

  @Input() habs : Habitacion[]=[];
  @Output() submitHabitaciones : EventEmitter<Habitacion[]> = new EventEmitter<Habitacion[]>();

  diasDelVector = 200;

  constructor() { }

  autocompletar(){
    let defaults = ['4','6','2','6','6','0','2','1','1','2','4'];

    this.habs.forEach( (h, i) => this.asignarCamas(i+1, defaults[i]));
  }

  submitControl(){
    if(this.habs.length>0)
    this.submitHabitaciones.emit();
  }
  
  asignarCamas(numHab : number, cantCamas : string) {
    let numCamas = parseInt(cantCamas);
    this.habs[numHab-1].camas = [];
  
    for (let c = 0; c < numCamas; c++) { // por cada cama
      
      let diasDisponibles : Dia[] = [];
      for(let i = 0 ; i<this.diasDelVector ; i++){       // creo un vector de días
        diasDisponibles.push({ fecha : i , estaDisponible: true});
      }

      let cama = {id : 100*numHab+c, dias: diasDisponibles};
      
      this.habs[numHab-1].camas.push(cama);
    }
  }
  escenario(num : number){
    switch(num){
      case 1:
          this.asignarCamas(1, "4");
          this.asignarCamas(2, "4");
          this.asignarCamas(3, "8");
          this.asignarCamas(4, "8");
          this.asignarCamas(5, "8");
          this.asignarCamas(6, "0");
          this.asignarCamas(7, "4");
          this.asignarCamas(8, "1");
          this.asignarCamas(9, "1");
          this.asignarCamas(10, "3");
          this.asignarCamas(11, "4");
        break;
      case 2:
        this.asignarCamas(1, "2");
        this.asignarCamas(2, "2");
        this.asignarCamas(3, "8");
        this.asignarCamas(4, "8");
        this.asignarCamas(5, "8");
        this.asignarCamas(6, "0");
        this.asignarCamas(7, "4");
        this.asignarCamas(8, "1");
        this.asignarCamas(9, "1");
        this.asignarCamas(10, "3");
        this.asignarCamas(11, "4");
        break;
      case 3:
        this.asignarCamas(1, "4");
        this.asignarCamas(2, "4");
        this.asignarCamas(3, "4");
        this.asignarCamas(4, "4");
        this.asignarCamas(5, "4");
        this.asignarCamas(6, "0");
        this.asignarCamas(7, "4");
        this.asignarCamas(8, "1");
        this.asignarCamas(9, "1");
        this.asignarCamas(10, "3");
        this.asignarCamas(11, "4");
        break;
      case 4:
        this.asignarCamas(1, "2");
        this.asignarCamas(2, "2");
        this.asignarCamas(3, "2");
        this.asignarCamas(4, "2");
        this.asignarCamas(5, "2");
        this.asignarCamas(6, "0");
        this.asignarCamas(7, "2");
        this.asignarCamas(8, "1");
        this.asignarCamas(9, "1");
        this.asignarCamas(10, "2");
        this.asignarCamas(11, "2");
        break;
    }
  }

  ngOnInit(): void {
    // ESCENARIO 1 (Máximos)
    // this.escenario(1);
    // ESCENARIO 2
    // this.escenario(2);
    // ESCENARIO 3
    // this.escenario(3);
    // ESCENARIO 4 ( Mínimos corte telo )
    this.escenario(4);
  }

}
