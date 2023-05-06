import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarResultadosComponent } from './mostrar-resultados.component';

describe('MostrarResultadosComponent', () => {
  let component: MostrarResultadosComponent;
  let fixture: ComponentFixture<MostrarResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
