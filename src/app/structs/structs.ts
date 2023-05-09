

export interface Habitacion {
  numId: number;
  camas: Cama[];
}

export interface Cama {
  id: number;
  dias: Dia[];
}

export interface Dia {
  fecha: number;
  estaDisponible: boolean;
}

export interface GananciaHabitacion{
  numHab : number;
  ganancia : number;
}

export interface ColorSimu{
  r:number;
  g:number;
  b:number;
  a:number;
}
