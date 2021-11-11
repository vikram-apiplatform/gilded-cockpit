import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCmpComponent } from './order-cmp.component';

describe('OrderCmpComponent', () => {
  let component: OrderCmpComponent;
  let fixture: ComponentFixture<OrderCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
