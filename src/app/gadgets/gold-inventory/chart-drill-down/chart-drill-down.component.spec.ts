import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDrillDownComponent } from './chart-drill-down.component';

describe('ChartDrillDownComponent', () => {
  let component: ChartDrillDownComponent;
  let fixture: ComponentFixture<ChartDrillDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDrillDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDrillDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
