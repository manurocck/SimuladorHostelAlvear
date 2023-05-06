import { Component, OnInit } from '@angular/core';
import { Cama, Habitacion } from '../../structs/habitacion';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})

export class InicioComponent implements OnInit {
  ngOnInit(): void {
    this.inicializarHabitaciones(11);
  }

  constructor() {}

  precioHabitacion  = 10;
  totalHabitaciones = 11;
  habitaciones: Habitacion[] = [];

  tiempo = 0;
  tiempoFinal = 90;
  tiempoProximoPedidoReserva = 0;
  
  disponibilidad = true;

  precioTotal = 0;

  oc: any[][] = [];

  distribuirCamas(camasPorHabitacion: number[]) {
    //recibo por input del usuario una lista de cantidad de camas por habitacion

    for (let i = 0; i < this.totalHabitaciones; i++) {
      var camas: Array<Cama> = [];
      for (let j = 0; j < camasPorHabitacion[j]; j++) {
        camas[j] = { id: j, ocupada: false };
      }

      this.habitaciones[i] = {num: i, camas : camas};
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
  inicializarHabitaciones(cantidad : number){
    for(let i = 0; i<cantidad; i++){
      this.habitaciones[i] =
        { num: i+1, 
          camas :[] 
        };
    }
  }

  simular() {  

    this.inicializarHabitaciones(11);

    while (this.tiempo <= this.tiempoFinal) {
      this.tiempo = this.tiempoProximoPedidoReserva; //ver como generar el primer tppr
      this.tiempoProximoPedidoReserva = this.calcularTiempoProximoPedidoReserva(
        this.tiempo,
        this.generarIntervaloPedidosReserva()
      );

      let cantidadPersonas = this.generarCantidadPersonas();
      let tiempoEstadia    = this.generarTiempoEstadia();
      let fechaReserva     = this.calcularFechaReserva(
        this.tiempo,
        this.generarTiempoAnticipacionReserva()
      );

      for (var i = 0; i < this.totalHabitaciones; i++) {
        let n = this.habitaciones[i].camas.length; //filtrar camas libres
        for (let k = 0; k < tiempoEstadia && this.disponibilidad; k++) {
          let camasLibres = 0;

          for (let j = 0; j < n; j++) {
            camasLibres = this.habitaciones[i].camas[j].ocupada
              ? camasLibres
              : camasLibres + 1;
          }
          if (camasLibres >= cantidadPersonas) {
          } else {
            this.disponibilidad = false;
          }
        }
      }
      if ((i = 11)) {
        this.precioTotal = this.calcularPrecio(
           10, // precio fijo en dólares
           cantidadPersonas,
           tiempoEstadia
        );
      } else {
      }
    }
  }
}
