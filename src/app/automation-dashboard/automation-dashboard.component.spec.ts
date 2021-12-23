import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationDashboardComponent } from './automation-dashboard.component';

describe('AutomationDashboardComponent', () => {
  let component: AutomationDashboardComponent;
  let fixture: ComponentFixture<AutomationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
