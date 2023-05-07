import { Component, OnInit } from '@angular/core';
import { Cama, Habitacion, Reserva } from '../../structs/habitacion';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})

export class InicioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.inicializar();
  }
  
  precioCama  = 10;
  totalHabitaciones = 2;
  habitaciones: Habitacion[] = [];

  tiempo = 0;
  tiempoFinal = 40;
  tiempoProximoPedidoReserva = 2;
  
  disponibilidad = true;
  simulando = false;

  dineroTotalRechazados = 0;

  // vector estado
  reservas : Reserva[] = [];


  //generarTiempoProximoPedidoReserva() {return 1;}
  generarCantidadPersonas() {
    return 3;
  }
  generarTiempoEstadia() {
    return 5;
  }
  generarTiempoAnticipacionReserva() {
    return 4;
  }
  generarIntervaloPedidosReserva() {
    return 1;
  }

  mostrar(){
    return this.reservas;
  }

  calcularPrecio( cantidadPersonas: number, tiempoEstadia: number ) {
    // definir precio fijo por persona
    return this.precioCama * cantidadPersonas * tiempoEstadia;
  }


  inicializar(){
    for(let i = 0; i<this.totalHabitaciones; i++){
      this.habitaciones[i] =
        { num: i+1, 
          camas :[] 
        };
    }

    for(let i = 0 ; i<90 ; i++){
      this.habitaciones.forEach( h => this.reservas.push( {habitacion : h, fecha: i} ))
    }
  }

  simular() {  
    this.inicializar();
    
    this.simulando = true;

    //while (this.tiempo <= this.tiempoFinal) {
      this.tiempo = this.tiempoProximoPedidoReserva; //ver como generar el primer tppr
      
      this.tiempoProximoPedidoReserva = this.tiempo + this.generarIntervaloPedidosReserva();

      let cantidadPersonas = this.generarCantidadPersonas();
      let tiempoEstadia    = this.generarTiempoEstadia();

      let i = 0;

      for (i ; i < this.habitaciones.length ; i++) { // iteración por habitación
        let n = this.habitaciones[i].camas.length;
        
        for (let k = 0; k < tiempoEstadia && this.disponibilidad; k++) { // iteración por fecha de estadía
          let camasLibres = 0;

          for (let j = 0; j < n; j++) { // iteración por camas de habitación [i]
            camasLibres = this.habitaciones[i].camas[j].disponible
              ? camasLibres + 1
              : camasLibres;
          }

          if (camasLibres < cantidadPersonas) this.disponibilidad = false;
        }
      }

      if ((i = 11)) this.dineroTotalRechazados = this.calcularPrecio( cantidadPersonas, tiempoEstadia);


      else{ // actualizar vector estado
        let fechaReserva = this.generarTiempoAnticipacionReserva() + this.tiempo;
        
        // habitacion i
        for(let j = 0; j<tiempoEstadia ; j++){
 
          let habitacionEnFecha = this.reservas.filter( r => r.fecha == fechaReserva && r.habitacion.num == i).map(r => r.habitacion);
          
          for( let j = 0 ; j < this.reservas.length ; j++){ 
            if( this.reservas[j].fecha == fechaReserva){
              if(this.reservas[j].habitacion.num == i){
                let camasAsignadas = 0;
                for( let k = 0 ; k < this.reservas[j].habitacion.camas.length ; k++){
                  if(this.reservas[j].habitacion.camas[k].disponible && camasAsignadas<cantidadPersonas){
                     this.reservas[j].habitacion.camas[k].disponible = false; 
                    camasAsignadas++;
                  }
                } 
                j = this.reservas.length; // para que deje de iterar
              }
            }
          }
        }
      }    
      

    //}
  }
}
