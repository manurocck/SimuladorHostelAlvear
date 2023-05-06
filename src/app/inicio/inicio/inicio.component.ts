import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  ngOnInit(): void {}
  tiempo = 0;
  tppr = 0;
  ipr = 0;
  i = 11; // leer desde input
  j = 11; // leer desde input
  n = 11; // leer desde input
  //habitaciones: Habitacion[] = [new Habitacion(numeroHabitacion=1, numeroCamas=4), 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  disponibilidad = true;
  camasLibres = 0;
  precioHabitacion = 10;
  precioTotal = 0;
  fechaReserva = 0;
  // oc: any[][] = [
  //   [this.habitaciones],
  //   [this.fechaReserva],
  // ];
  cantidadPersonas = 0;
  tiempoEstadia: number = 0;
  tiempoAnticipadoReserva: number = 0;

  // class Habitacion {
  // numeroHabitacion: number=0;
  // camas: Camas[];
  // }

  //  class Cama{
  //   
  //   ocupada =false;
  //   constructor(public numeroCama:number){
  //}
  // }

  generarCantidadPersonas() {
    return 1;
  }
  generarTiempoEstadia() {
    return 1;
  }
  generarTiempoAnticipacionReserva() {
    return 1;
  }

  precio(precio: number, cantidadPersonas: number, tiempoEstadia: number) {
    return precio + cantidadPersonas * this.precioHabitacion * tiempoEstadia;
  }

  tiempoProximoPedidoReserva(tiempo: number, ipr: number) {
    return tiempo + ipr;
  }

  calcularFechaReserva(tiempo: number, tar: number) {
    return tiempo + tar;
  }

  // constructor() {}

  generarIntervaloPedidosReserva() {
    return 1;
  }

  simular() {
    this.tiempo = this.tppr;
    this.tppr = this.tiempoProximoPedidoReserva(
      this.tiempo,
      this.generarIntervaloPedidosReserva()
    );

    this.cantidadPersonas = this.generarCantidadPersonas();
    this.tiempoEstadia = this.generarTiempoEstadia();
    this.fechaReserva = this.calcularFechaReserva(
      this.tiempo,
      this.generarTiempoAnticipacionReserva()
    );

    // for(let i=0; i<this.i; i++){
    //   for(let k=0; k <this.tiempoEstadia && this.disponibilidad; k++){
    //     for(let j=0; j<this.n; j++){

    //       }
    //     }
    //   }
    // }
  }
}
