import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisssionsAddeditComponent } from './permisssions-addedit.component';

describe('PermisssionsAddeditComponent', () => {
  let component: PermisssionsAddeditComponent;
  let fixture: ComponentFixture<PermisssionsAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisssionsAddeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisssionsAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
