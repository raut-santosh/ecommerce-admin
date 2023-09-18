import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAddeditComponent } from './orders-addedit.component';

describe('OrdersAddeditComponent', () => {
  let component: OrdersAddeditComponent;
  let fixture: ComponentFixture<OrdersAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersAddeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
