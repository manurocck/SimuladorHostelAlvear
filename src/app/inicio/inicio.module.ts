import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { FormularioControlComponent } from './formulario-control/formulario-control.component';


@NgModule({
  declarations: [
    InicioComponent,
    FormularioControlComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
