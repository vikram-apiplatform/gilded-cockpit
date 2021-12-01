import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemediationsComponent } from './remediations.component';

describe('RemediationsComponent', () => {
  let component: RemediationsComponent;
  let fixture: ComponentFixture<RemediationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemediationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
