import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitHeaderComponent } from './cockpit-header.component';

describe('CockpitHeaderComponent', () => {
  let component: CockpitHeaderComponent;
  let fixture: ComponentFixture<CockpitHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
