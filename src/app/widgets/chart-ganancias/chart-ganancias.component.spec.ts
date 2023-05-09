import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGananciasComponent } from './chart-ganancias.component';

describe('ChartGananciasComponent', () => {
  let component: ChartGananciasComponent;
  let fixture: ComponentFixture<ChartGananciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGananciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGananciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
