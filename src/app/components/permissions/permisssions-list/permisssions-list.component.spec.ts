import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisssionsListComponent } from './permisssions-list.component';

describe('PermisssionsListComponent', () => {
  let component: PermisssionsListComponent;
  let fixture: ComponentFixture<PermisssionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisssionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisssionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
