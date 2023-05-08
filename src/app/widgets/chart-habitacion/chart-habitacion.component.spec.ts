import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHabitacion } from './chart-habitacion.component';

describe('ScatteredChartComponent', () => {
  let component: ChartHabitacion;
  let fixture: ComponentFixture<ChartHabitacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartHabitacion ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHabitacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
