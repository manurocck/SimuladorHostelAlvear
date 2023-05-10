import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOcupacionComponent } from './chart-ocupacion.component';

describe('ChartOcupacionComponent', () => {
  let component: ChartOcupacionComponent;
  let fixture: ComponentFixture<ChartOcupacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOcupacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOcupacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
