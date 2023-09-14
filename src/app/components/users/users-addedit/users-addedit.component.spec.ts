import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddeditComponent } from './users-addedit.component';

describe('UsersAddeditComponent', () => {
  let component: UsersAddeditComponent;
  let fixture: ComponentFixture<UsersAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAddeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
