import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { FormularioControlComponent } from './formulario-control/formulario-control.component';
import { MostrarResultadosComponent } from './mostrar-resultados/mostrar-resultados.component';
import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [
    InicioComponent,
    FormularioControlComponent,
    MostrarResultadosComponent
  ],
  imports: [
    CommonModule,
    WidgetsModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
