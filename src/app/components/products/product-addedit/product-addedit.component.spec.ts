import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddeditComponent } from './product-addedit.component';

describe('ProductAddeditComponent', () => {
  let component: ProductAddeditComponent;
  let fixture: ComponentFixture<ProductAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
