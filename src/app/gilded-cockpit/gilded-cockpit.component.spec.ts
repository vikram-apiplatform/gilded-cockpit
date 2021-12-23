import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GildedCockpitComponent } from './gilded-cockpit.component';

describe('GildedCockpitComponent', () => {
  let component: GildedCockpitComponent;
  let fixture: ComponentFixture<GildedCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GildedCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GildedCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
