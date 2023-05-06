import { NumberSymbol } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-formulario-control',
  templateUrl: './formulario-control.component.html',
  styleUrls: ['./formulario-control.component.css']
})
export class FormularioControlComponent implements OnInit {

  @Input() habitaciones : number[]=[];
  @Output() submit = new EventEmitter();

  constructor() { }

  comenzarSimulacion(){
    return this.submit.emit("submit", 4, 6, 1);
  }

  ngOnInit(): void {
  }

}
