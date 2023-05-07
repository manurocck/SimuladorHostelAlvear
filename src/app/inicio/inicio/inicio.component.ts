import { Component, OnInit } from '@angular/core';
import { Habitacion, VectorEstado } from '../../structs/habitacion';


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

  inicializar(){
    for(let i = 0; i<this.totalHabitaciones; i++){
      this.habitaciones[i] =
        { numId: i+1, 
          camas : [] 
        };
    }
  }

  
  precioCama  = 10;
  totalHabitaciones = 2;
  habitaciones: Habitacion[] = [];

  tiempo = 0;
  tiempoFinal = 40;
  tiempoProximoPedidoReserva = 0;
  
  hayDisponibilidad = true;
  simulando = false;

  dineroTotalRechazados = 0;


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
  }

  calcularPrecio( cantidadPersonas: number, tiempoEstadia: number ) {
    // definir precio fijo por persona
    return this.precioCama * cantidadPersonas * tiempoEstadia;
  }

  
  camasLibres   : [data:{ x: number , y: number }] = [{x:0,y:0}]; // idcama, fecha
  camasOcupadas : [data:{ x: number , y: number }] = [{x:0,y:0}]; // idcama, fecha

  setChart(){
    this.camasLibres.pop();
    this.camasOcupadas.pop();
    
    this.habitaciones.forEach( 
      h => h.camas.forEach(
        c => c.dias.forEach(
          d => {
            let data = {x: d.fecha, y : c.id}; 
            if(d.estaDisponible) {
              this.camasLibres.push(data);
              console.log("Push cama libre con data ", data);
            }
            else {
              this.camasOcupadas.push(data);
              console.log("Push cama ocupada con data ", data);
            }
          }
        )
      ))
  }

  simular() {

    this.simulando = true;

    //while (this.tiempo <= this.tiempoFinal) {
      this.tiempo = this.tiempoProximoPedidoReserva; //ver como generar el primer tppr
      
      this.tiempoProximoPedidoReserva = this.tiempo + this.generarIntervaloPedidosReserva();

      let cantidadPersonas = this.generarCantidadPersonas();
      let tiempoEstadia    = this.generarTiempoEstadia();

      let fechaReserva = this.generarTiempoAnticipacionReserva() + this.tiempo;
      let i = 0;    
      
      this.habitaciones.forEach( 
        habitacion =>{
          let camasMeSirven = 0;
          habitacion.camas.forEach(  // Chequeo disponibilidad
            cama => {
              let diasLibre = 0;
              
              for(let f = fechaReserva ; f < fechaReserva+tiempoEstadia ; f++){
                
                if(cama.dias[f].estaDisponible) diasLibre++;
              }
              if(diasLibre >= tiempoEstadia) camasMeSirven++;
            }
          )

          if(camasMeSirven >= cantidadPersonas) { // Asigno reserva

            console.log("Reserva desde fecha : ", fechaReserva, " hasta : ", fechaReserva+tiempoEstadia);
            console.log("Para : ", cantidadPersonas);

            // Reserva : 
            // 3 , 5 días

            // Matriz inicial

            // día        4 5 6 7 8
            // cama 200 : 0 1 0 0 1
            // cama 201 : 0 1 1 0 1 
            // cama 202 : 1 0 0 1 0 
            // cama 203 : 1 0 1 1 1 
            // cama 204 : 1 1 1 1 0

            // Matriz después de la reserva
            
            // día        4 5 6 7 8
            // cama 200 : 0 1 0 0 1 ( marco 1 ) 
            // cama 201 : 0 1 1 0 1 
            // cama 202 : 0 0 0 1 0 
            // cama 203 : 0 0 1 1 1 
            // cama 204 : 1 1 1 1 0 
            // cama 205 : 1 1 1 1 0 
            
            let c = 0;
            for(let f = fechaReserva ; f<(tiempoEstadia+fechaReserva) ; f++){ //iteración por fecha
              
              var funcionaplis = 0;
              
              habitacion.camas.forEach(cama =>{
                if(cama.dias[f].estaDisponible && funcionaplis<cantidadPersonas){
                    cama.dias[f].estaDisponible = false;
                    funcionaplis++;
                  }
                })
              

            }  
          }
          else{ console.log("Reserva rechazada por la habitacion ", habitacion.numId)}
        }
      );
      
      
    this.setChart();

    //}
  }
}
