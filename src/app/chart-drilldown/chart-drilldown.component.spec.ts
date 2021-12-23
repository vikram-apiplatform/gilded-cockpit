import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDrilldownComponent } from './chart-drilldown.component';

describe('ChartDrilldownComponent', () => {
  let component: ChartDrilldownComponent;
  let fixture: ComponentFixture<ChartDrilldownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDrilldownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDrilldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
