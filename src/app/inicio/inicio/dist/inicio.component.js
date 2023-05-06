"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InicioComponent = void 0;
var core_1 = require("@angular/core");
var cama_1 = require("../../clases/cama");
var habitacion_1 = require("../../clases/habitacion");
var InicioComponent = /** @class */ (function () {
    function InicioComponent() {
        this.totalHabitaciones = 11;
        this.tiempo = 0;
        this.tiempoFinal = 90;
        this.tiempoProximoPedidoReserva = 0;
        this.intervaloProximaReserva = 0;
        //i = 11; // leer desde input
        //j:number = 11; // leer desde input
        //n = 11; // leer desde input
        this.habitaciones = [];
        this.disponibilidad = true;
        //camasLibres = 0;
        this.precioHabitacion = 10; //si agrego public me deja setear valores?
        this.precioTotal = 0;
        this.fechaReserva = 0;
        this.cantidadPersonas = 0;
        this.tiempoEstadia = 0;
        this.tiempoAnticipadoReserva = 0;
        this.oc = [[this.habitaciones], [this.fechaReserva]];
    }
    InicioComponent.prototype.ngOnInit = function () { };
    InicioComponent.prototype.distribuirCamas = function (camasPorHabitacion) {
        //recibo por input del usuario una lista de cantidad de camas por habitacion
        for (var i = 0; i < this.totalHabitaciones; i++) {
            var camas = [];
            for (var j = 0; j < camasPorHabitacion[j]; j++) {
                camas[j] = new cama_1.Cama(j);
            }
            this.habitaciones[i] = new habitacion_1.Habitacion(i, camas);
        }
    };
    //generarTiempoProximoPedidoReserva() {return 1;}
    InicioComponent.prototype.generarCantidadPersonas = function () {
        return 1;
    };
    InicioComponent.prototype.generarTiempoEstadia = function () {
        return 1;
    };
    InicioComponent.prototype.generarTiempoAnticipacionReserva = function () {
        return 1;
    };
    InicioComponent.prototype.generarIntervaloPedidosReserva = function () {
        return 1;
    };
    InicioComponent.prototype.calcularPrecio = function (precio, cantidadPersonas, tiempoEstadia) {
        return precio + cantidadPersonas * this.precioHabitacion * tiempoEstadia;
    };
    InicioComponent.prototype.calcularTiempoProximoPedidoReserva = function (tiempo, ipr) {
        return tiempo + ipr;
    };
    InicioComponent.prototype.calcularFechaReserva = function (tiempo, tiempoAnticipadoReserva) {
        return tiempo + tiempoAnticipadoReserva;
    };
    InicioComponent.prototype.simular = function () {
        while (this.tiempo < this.tiempoFinal) {
            this.tiempo = this.tiempoProximoPedidoReserva; //ver como generar el primer tppr
            this.tiempoProximoPedidoReserva = this.calcularTiempoProximoPedidoReserva(this.tiempo, this.generarIntervaloPedidosReserva());
            this.cantidadPersonas = this.generarCantidadPersonas();
            this.tiempoEstadia = this.generarTiempoEstadia();
            this.fechaReserva = this.calcularFechaReserva(this.tiempo, this.generarTiempoAnticipacionReserva());
            for (var i = 0; i < this.totalHabitaciones; i++) {
                var n = this.habitaciones[i].camas.length; //filtrar camas libres
                for (var k = 0; k < this.tiempoEstadia && this.disponibilidad; k++) {
                    var camasLibres = 0;
                    for (var j = 0; j < n; j++) {
                        camasLibres = this.habitaciones[i].camas[j].ocupada
                            ? camasLibres
                            : camasLibres + 1;
                    }
                    if (camasLibres >= this.cantidadPersonas) {
                    }
                    else {
                        this.disponibilidad = false;
                    }
                }
            }
            if ((i = 11)) {
                this.precioTotal = this.calcularPrecio(this.precioTotal, this.cantidadPersonas, this.tiempoEstadia);
            }
            else {
            }
        }
    };
    InicioComponent = __decorate([
        core_1.Component({
            selector: 'app-inicio',
            templateUrl: './inicio.component.html',
            styleUrls: ['./inicio.component.css']
        })
    ], InicioComponent);
    return InicioComponent;
}());
exports.InicioComponent = InicioComponent;
