export interface Habitacion{
  num: number,
  camas: Cama[]
}

export interface Cama {
  id : number,
  ocupada: boolean
}
 