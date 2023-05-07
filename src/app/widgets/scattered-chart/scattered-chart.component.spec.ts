import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatteredChartComponent } from './scattered-chart.component';

describe('ScatteredChartComponent', () => {
  let component: ScatteredChartComponent;
  let fixture: ComponentFixture<ScatteredChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatteredChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScatteredChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
