import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() tiempo = 0;
  
  tiempoRedondeado(){
    return Math.floor(this.tiempo/24);
  }
}
