

export interface VectorEstado {
  habitaciones: Habitacion[];
}

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


