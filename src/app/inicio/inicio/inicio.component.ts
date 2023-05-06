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
  totalHabitaciones = 11;
  tiempo = 0;
  public tiempoFinal = 90;
  tiempoProximoPedidoReserva = 0;
  intervaloProximaReserva = 0;
  //i = 11; // leer desde input
  //j:number = 11; // leer desde input
  //n = 11; // leer desde input
  habitaciones: Habitacion[] = [];
  disponibilidad = true;
  //camasLibres = 0;
  public precioHabitacion = 10; //si agrego public me deja setear valores?
  precioTotal = 0;
  fechaReserva = 0;
  cantidadPersonas = 0;
  tiempoEstadia: number = 0;
  tiempoAnticipadoReserva: number = 0;
  oc: any[][] = [[this.habitaciones], [this.fechaReserva]];

  constructor() {}
  distribuirCamas(camasPorHabitacion: number[]) {
    //recibo por input del usuario una lista de cantidad de camas por habitacion

    for (let i = 0; i < this.totalHabitaciones; i++) {
      var camas: Array<Cama> = [];
      for (let j = 0; j < camasPorHabitacion[j]; j++) {
        camas[j] = new Cama(j);
      }

      this.habitaciones[i] = new Habitacion(i, camas);
    }
  }

  //generarTiempoProximoPedidoReserva() {return 1;}
  generarCantidadPersonas() {
    return 1;
  }
  generarTiempoEstadia() {
    return 1;
  }
  generarTiempoAnticipacionReserva() {
    return 1;
  }
  generarIntervaloPedidosReserva() {
    return 1;
  }

  calcularPrecio(
    precio: number,
    cantidadPersonas: number,
    tiempoEstadia: number
  ) {
    return precio + cantidadPersonas * this.precioHabitacion * tiempoEstadia;
  }

  calcularTiempoProximoPedidoReserva(tiempo: number, ipr: number) {
    return tiempo + ipr;
  }

  calcularFechaReserva(tiempo: number, tiempoAnticipadoReserva: number) {
    return tiempo + tiempoAnticipadoReserva;
  }

  simular() {
    while (this.tiempo < this.tiempoFinal) {
      this.tiempo = this.tiempoProximoPedidoReserva; //ver como generar el primer tppr
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

      for (var i = 0; i < this.totalHabitaciones; i++) {
        let n = this.habitaciones[i].camas.length; //filtrar camas libres
        for (let k = 0; k < this.tiempoEstadia && this.disponibilidad; k++) {
          let camasLibres = 0;

          for (let j = 0; j < n; j++) {
            camasLibres = this.habitaciones[i].camas[j].ocupada
              ? camasLibres
              : camasLibres + 1;
          }
          if (camasLibres >= this.cantidadPersonas) {
          } else {
            this.disponibilidad = false;
          }
        }
      }
      if ((i = 11)) {
        this.precioTotal = this.calcularPrecio(
          this.precioTotal,
          this.cantidadPersonas,
          this.tiempoEstadia
        );
      } else {
      }
    }
  }
}
