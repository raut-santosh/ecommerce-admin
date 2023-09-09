import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAddeditComponent } from './roles-addedit.component';

describe('RolesAddeditComponent', () => {
  let component: RolesAddeditComponent;
  let fixture: ComponentFixture<RolesAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesAddeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
