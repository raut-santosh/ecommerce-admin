import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersRoutingModule } from './users-routing.module';
import { UsersAddeditComponent } from './users-addedit/users-addedit.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersAddeditComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class UsersModule { }
