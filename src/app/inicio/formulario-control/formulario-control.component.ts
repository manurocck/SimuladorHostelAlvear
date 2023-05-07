import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cama, Habitacion } from 'src/app/structs/habitacion';

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
    this.submitHabitaciones.emit(this.habs);
  }
  
  asignarCamas(numHab : number, cantCamas : string) {
    let numCamas = parseInt(cantCamas);
    this.habs[numHab-1].camas = [];

    for (let j = 0; j < numCamas; j++) {
      let cama = {id : 200+j, disponible: true};
      this.habs[numHab-1].camas.push(cama);
    }
  }

  ngOnInit(): void {
  }

}
