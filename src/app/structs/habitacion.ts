export interface Habitacion{
  num: number,
  camas: Cama[]
}

export interface Cama {
  id : number,
  disponible: boolean
}
 
export interface Reserva{
  habitacion : Habitacion,
  fecha: number
}