import { Component, OnInit } from '@angular/core';
import { Cama } from '../../clases/cama';
import { Habitacion } from '../../clases/habitacion';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  ngOnInit(): void {}
  tiempo = 0;
  tiempoProximoPedidoReserva = 0;
  ipr = 0;
  //i = 11; // leer desde input
  //j:number = 11; // leer desde input
  //n = 11; // leer desde input
  habitaciones: Habitacion[] = [];
  disponibilidad = true;
  camasLibres = 0;
  precioHabitacion = 10;
  precioTotal = 0;
  fechaReserva = 0;
  oc: any[][] = [[this.habitaciones], [this.fechaReserva]];
  cantidadPersonas = 0;
  tiempoEstadia: number = 0;
  tiempoAnticipadoReserva: number = 0;

  
  distribuirCamas(camasPorHabitacion: number[]) {
    //recibo por input del usuario una lista de cantidad de camas por habitacion

    for (let i = 0; i < 11; i++) {
      var camas: Array<Cama> = [];
      for (let j = 0; j < camasPorHabitacion[j]; j++) {
        camas[j] = new Cama(j);
      }

      this.habitaciones[i] = new Habitacion(i, camas);
    }
  }
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

  calcularTiempoProximoPedidoReserva(tiempo: number, ipr: number) {
    return tiempo + ipr;
  }

  calcularFechaReserva(tiempo: number, tar: number) {
    return tiempo + tar;
  }

   constructor() {}

  generarIntervaloPedidosReserva() {
    return 1;
  }

  simular() {
    this.tiempo = this.tiempoProximoPedidoReserva;
    this.tiempoProximoPedidoReserva = this.calcularTiempoProximoPedidoReserva(
      this.tiempo,
      this.generarIntervaloPedidosReserva()
    );

    this.cantidadPersonas = this.generarCantidadPersonas();
    this.tiempoEstadia = this.generarTiempoEstadia();
    this.fechaReserva = this.calcularFechaReserva(
      this.tiempo,
      this.generarTiempoAnticipacionReserva()
    );

    // for(let i=0; i < this.i; i++){
    //   for(let k=0; k < this.tiempoEstadia && this.disponibilidad; k++){
    //     for(let j=0; j<this.n; j++){

    //       }
    //     }
    //   }
    // }
  }
}
