import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  habitaciones=[1,2,3,4,5,7,8,9,10,11];
  
  constructor() { }

  guardar(nums:Number[]){}

  cantidadCamas(){
    return 5;
  }

  ngOnInit(): void {
  }

}
