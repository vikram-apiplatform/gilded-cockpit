import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildReportComponent } from './build-report.component';

describe('BuildReportComponent', () => {
  let component: BuildReportComponent;
  let fixture: ComponentFixture<BuildReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
