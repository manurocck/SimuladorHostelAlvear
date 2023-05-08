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
    this.submitHabitaciones.emit();
  }
  
  asignarCamas(numHab : number, cantCamas : string) {
    let numCamas = parseInt(cantCamas);
    this.habs[numHab-1].camas = [];

    
    
    for (let c = 0; c < numCamas; c++) { // por cada cama
      
      let diasDisponibles : Dia[] = [];
      for(let i = 0 ; i<90 ; i++){       // creo un vector de días
        diasDisponibles.push({ fecha : i , estaDisponible: true});
      }

      let cama = {id : 100*numHab+c, dias: diasDisponibles};
      
      this.habs[numHab-1].camas.push(cama);
    }
  }

  ngOnInit(): void {
    this.asignarCamas(1, "6");
    this.asignarCamas(2, "5");
    this.asignarCamas(3, "5");
    this.asignarCamas(4, "3");
  }

}
