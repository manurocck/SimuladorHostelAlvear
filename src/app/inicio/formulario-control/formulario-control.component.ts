import { Component, Input, OnInit, Output } from '@angular/core';
import { Cama, Habitacion } from 'src/app/structs/habitacion';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-formulario-control',
  templateUrl: './formulario-control.component.html',
  styleUrls: ['./formulario-control.component.css']
})
export class FormularioControlComponent implements OnInit {

  @Input() habitaciones : Habitacion[]=[];
  camasPorHabitacion : string[] = [];

  constructor() { }
  
  mostrar(){
    console.log(this.camasPorHabitacion);
    console.log(this.habitaciones);
  }
  
  asignarCamas(numHab : number, cantCamas : string) {
    let numCamas = parseInt(cantCamas);
    this.habitaciones[numHab-1].camas = [];

    for (let j = 0; j < numCamas; j++) {
      let cama = {id : 200+j, ocupada: false};
      this.habitaciones[numHab-1].camas.push(cama);
    }
      
    console.log(this.habitaciones);
  }

  ngOnInit(): void {
  }

}
