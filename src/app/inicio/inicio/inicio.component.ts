import { Component, OnInit } from '@angular/core';
import { GananciaHabitacion, Habitacion } from '../../structs/structs';

const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

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
  sleepAmount = 1

  // RESULTADOS
  // por mes
  resultadoPerdidaRechazos : number[] = [];
  resultadoPorcentajeOcupacion : number[] = [];
  resultadoRelacionGanancia : GananciaHabitacion[] = [];

  // VECTOR ESTADO
  habitaciones: Habitacion[] = [];

  // CONDICIONES INICIALES DEL MODELO
  precioCama  = 17.70; // usd
  perdidaPorRechazos = 0;
  totalHabitaciones = 11;
  
  tiempo = 0;
  tiempoProximoPedidoReserva = 0;

  diaProximoReporte = 30;
  diasDeSimulacion = 100;
  tiempoFinal = this.diasDeSimulacion*24; // no tocar
  
  // FLAGS
  hayDisponibilidad = true;
  simulando = false;
  mostrarResultados = false;
  
  // DATOS PARA GENERAR
  generarCantidadPersonas() { // por el método del rechazo
    let max = this.distLogaritmica(1);
    
    let rand1 = Math.random();
    let rand2 = Math.random();

    let x = 1 + (7-1) * rand1;

    let y = max * rand2;

    if( y>this.distLogaritmica(x) ) x=this.generarCantidadPersonas();

    return Math.round(x);
  }

  generarTiempoEstadia() { // por el método de la función inversa
    return this.inverseGaussian();
  }

  generarIntervaloPedidosReserva() { // probabilidad uniforme de ocurrencia
    let posibilidades = [0.5,1,2];
    let indiceRandom = Math.floor(( (Math.random()+1)*100)%3);
    
    return posibilidades[indiceRandom];
  }
  generarTiempoAnticipacionReserva() { // probabilidad uniforme de ocurrencia
    let posibilidades = [0
                        ,1,1
                        ,2,2,2,2
                        ,3,3,3,3,3,3
                        ,4,4,4,4,4,4,4
                        ,5,5,5,5,5
                        ,6,6,6,6,6,6,6,6,6,6
                        ,7,7,7
                        ,8,8,8,8,8,8,8
                        ,9,9,9,9,9,9,9,9,9
                        ,10,10,10,10
                        ,11,11,11
                        ,12,12
                        ,13,13
                        ,14];

    let indiceRandom = Math.floor(( (Math.random()+1)*100)%3);

    return posibilidades[indiceRandom];
  }

  calcularPrecio( cantidadPersonas: number, tiempoEstadia: number ) {
    // definir precio fijo por persona
    return this.precioCama * cantidadPersonas * tiempoEstadia;
  }

  async simular() {
    let mes = 1;
    this.simulando = true;

    while (this.tiempo <= this.tiempoFinal) {
      if (this.tiempo/24 <= this.diaProximoReporte)
        this.tiempo = this.tiempoProximoPedidoReserva;
      else{ // pedí el reporte
          this.reporteMensual(mes);
          mes++;
      }

      // Se atiende de 7 a 23 hs
      this.tiempoProximoPedidoReserva = this.tiempo + this.generarIntervaloPedidosReserva();
      // console.log("El próximo pedido será a las :",this.tiempoProximoPedidoReserva%24,'horas');
      if(this.tiempoProximoPedidoReserva%24 < 7){
        this.tiempoProximoPedidoReserva -= (this.tiempoProximoPedidoReserva%24); 
        this.tiempoProximoPedidoReserva += 7;
        // console.log("El horario de atención es de 7 a 24hs. Será atendido a las : ",this.tiempoProximoPedidoReserva%24,'horas');
      } 

      let cantidadPersonas = this.generarCantidadPersonas();
      let diasEstadia      = this.generarTiempoEstadia();
      let diasAnticipacion = this.generarTiempoAnticipacionReserva();

      let fechaReserva = Math.floor(this.tiempo/24) + diasAnticipacion;
      let reservaAceptada = false; 

      // console.log(">>>> SE GENERA UNA NUEVA RESERVA");
      // console.log("Desde el ", fechaReserva, " hasta el ", fechaReserva+tiempoEstadia, "para ", cantidadPersonas, " personas");
      // console.log("Con", diasAnticipacion,(diasAnticipacion==1)?'dia':'dias'," de anticipación");
      // console.log("Por", diasEstadia,(diasEstadia==1)?'noche':'noches');

      this.habitaciones.forEach( 
        habitacion =>{
          if(!reservaAceptada){
            let camasMeSirven = 0;
            habitacion.camas.forEach(  // Chequeo disponibilidad
              cama => {
                let diasLibre = 0;
                
                for(let f = fechaReserva ; f < fechaReserva+diasEstadia ; f++){
                  
                  if(cama.dias[f].estaDisponible) diasLibre++;
                }
                if(diasLibre >= diasEstadia) camasMeSirven++;
              }
            )

            if(camasMeSirven >= cantidadPersonas) { // Asigno reserva en esta hab
              // console.log("Reserva ACEPTADA por habitacion ", habitacion.numId)
              reservaAceptada = true;
              let cantCamas = habitacion.camas.length;
              let camasAsignadas = 0;
      
              for(let f = fechaReserva ; f<(diasEstadia+fechaReserva) ; f++){ //iteración por fecha
                camasAsignadas = 0;
                for(let c = 0; c<cantCamas ; c++){
                  // Marcar como no disponible CP cantidad de camas en la fecha F
                  if(habitacion.camas[c].dias[f].estaDisponible){
                    // actualizo vector estado
                    habitacion.camas[c].dias[f].estaDisponible = false;
                    
                    // actualizo puntos gráfico
                    let data = {x: f, y : habitacion.camas[c].id};
                    this.camasOcupadas.push(data);

                    // camaLibre : (x,y) = (fecha, id)
                    let index = this.camasLibres.findIndex( punto => punto.y == data.y && punto.x == data.x);
                    this.camasLibres.splice(index,1);

                    camasAsignadas++;
                    if(camasAsignadas == cantidadPersonas){
                      c = cantCamas;
                    }
                  }
                }
              }  
            }
            else {
              //console.log("Reserva RECHAZADA por la habitacion ", habitacion.numId)
              this.perdidaPorRechazos+=cantidadPersonas*diasEstadia*this.precioCama;
            }
          }
        }
      );
      
      if(this.sleepAmount>0) await sleep((100 * this.sleepAmount)); // Para hacerla asíncrona
      // console.log(">>>> FIN EVENTO. Tiempo actual : ", this.tiempo);
    }
    
    this.tiempo= this.diasDeSimulacion*24;
    this.impresionDeResultados();
  }
  reporteMensual(mes : number){
    this.diaProximoReporte+=30;
          let disponibles = 0;
          let capacidadMes = 0;
          let fechaInicioMes =  (mes-1)*30;
          let fechaFinDeMes  = mes*30;
          
          this.habitaciones.forEach(
            h => {
              let capacidadMesHab = 0;
              let disponiblesHab = 0;
              h.camas.forEach(     
              c=> c.dias.forEach(
              d=> { if(d.fecha<=fechaFinDeMes && d.fecha>=fechaInicioMes){
                      capacidadMes++;
                      capacidadMesHab++;
                      if(d.estaDisponible){
                        disponibles++;
                        disponiblesHab++;
                      }
                    }
                  }
                  )
              );

              this.resultadoRelacionGanancia.push( {numHab : h.numId, ganancia: Math.round(( (capacidadMesHab-disponiblesHab))*this.precioCama) }  ); // todo el hostel

            }
          )
          this.resultadoPorcentajeOcupacion.push(100*((capacidadMes-disponibles)/capacidadMes)); // todo el hostel
          this.resultadoPerdidaRechazos.push(this.perdidaPorRechazos);
          this.perdidaPorRechazos = 0;
  }
  impresionDeResultados(){
    console.log(">>>>>> DINERO PERDIDO POR MES");
    this.resultadoPerdidaRechazos.forEach( (r,index) => console.log("Dinero perdido por rechazos en mes",index+1,':',r));
    console.log(">>>>>>");
    console.log(">>>>>>");
    console.log(">>>>>>");
    console.log(">>>>>> PORCENTAJE DE OCUPACIÓN POR MES");
    this.resultadoPorcentajeOcupacion.forEach( (r,index) => console.log("Porcentaje de ocupación en mes",index+1,':',r));
    console.log(">>>>>>");
    console.log(">>>>>>");
    console.log(">>>>>>");
    console.log(">>>>>> GANANCIA POR HABITACION POR MES");
    for(let i = 0; i<(this.resultadoRelacionGanancia.length/this.habitaciones.length); i++){
      let indiceInicioMes=i*this.habitaciones.length;
      console.log(">>> MES",i+1);
      for(let j = 0; j<this.habitaciones.length ; j++){
        console.log("Ganancia habitación",this.resultadoRelacionGanancia[i+j].numHab,':',this.resultadoRelacionGanancia[i+j].ganancia);

      }
    }
    console.log(">>>>>>");
    console.log(">>>>>");
    console.log(">>>>");
    console.log(">>>");
    console.log(">> Fin del comunicado");
  }

  // auxiliares
  randomNormal(mean : number, stdDev : number) {
    let u1 = 1 - Math.random(); // Substract random number from unity
    let u2 = 1 - Math.random();
    let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return mean + stdDev * randStdNormal;
  }
  generateNormalNumberDistribution() {
    var u1 = Math.random();
    var u2 = Math.random();
    var z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z;
  }
  avanzarTiempo(){
    if(this.sleepAmount != 0) {this.sleepAmount = 0;}
    else {this.mostrarResultados = true;}
  }

  // f.d.p.
  distLogaritmica( x : number){
    let theeta = 0.45978;

    let factorA = (-1) / Math.log (1-theeta);
    let factorB = ( (theeta)**(x)) / x ;

    return factorA * factorB;
  }

  randJohnson(){
    let gamma = 1;
    let delta = 1;
    let lambda = 1;
    let chi = 0;
    let R = this.generateNormalNumberDistribution();
    
    return Math.round( ( (Math.pow(10, (R - gamma) / delta) * (lambda + chi) ) + chi) /
                            (1 + (Math.pow(10, (R - gamma) / delta) ) ) );
  }
  inverseGaussian(){
    let lambda = 3.8726;
    let mu = 2.1076;
    let v = this.randomNormal(0,1.5);
    let y = v * v;
    let x = mu + (mu * mu * y) / (2 * lambda) - (mu / (2 * lambda)) * Math.sqrt(4 * mu * lambda * y + mu * mu * y * y);
    let test = this.randomNormal(0,1);
    
    if (test <= (mu) / (mu + x)) return Math.ceil(x);
    else return Math.ceil((mu * mu) / x);
  }

  // CHART HABITACIONES
  camasLibres   : [data:{ x: number , y: number }] = [{x:0,y:0}]; // idcama, fecha
  camasOcupadas : [data:{ x: number , y: number }] = [{x:0,y:0}]; // idcama, fecha
  // inicializar gráfico
  inicializarChart(){
    this.simulando = true;
    this.camasLibres.pop();
    this.camasOcupadas.pop();
    
    this.habitaciones.forEach( 
      h => h.camas.forEach(
        c => c.dias.forEach(
          d => {
            let data = {x: d.fecha, y : c.id}; 
            if(d.estaDisponible) {
              this.camasLibres.push(data);
            }
            else {
              this.camasOcupadas.push(data);
            }
          }
        )
      ))
    this.simular();
  }
}
