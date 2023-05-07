import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cama, Dia, Habitacion } from 'src/app/structs/habitacion';


@Component({
  selector: 'app-formulario-control',
  templateUrl: './formulario-control.component.html',
  styleUrls: ['./formulario-control.component.css']
})
export class FormularioControlComponent implements OnInit {

  @Input() habs : Habitacion[]=[];
  @Output() submitHabitaciones : EventEmitter<Habitacion[]> = new EventEmitter<Habitacion[]>();

  camasPorHabitacion : string[] = [];

  constructor() { }

  submitControl(){
    if(this.habs.length>0)
    this.submitHabitaciones.emit(this.habs);
  }
  
  asignarCamas(numHab : number, cantCamas : string) {
    let numCamas = parseInt(cantCamas);
    this.habs[numHab-1].camas = [];

    let diasDisponibles : Dia[] = [];
    
    for(let i = 0 ; i<90 ; i++){
      diasDisponibles.push({ fecha : i , estaDisponible: true});
    }

    for (let j = 0; j < numCamas; j++) {
      let cama = {id : 100*numHab+j, dias: diasDisponibles};

      this.habs[numHab-1].camas.push(cama);
    }
  }

  ngOnInit(): void {
  }

}
