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

  ngOnInit(): void {
  }

}
