import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermisssionsListComponent } from './permisssions-list/permisssions-list.component';
import { PermisssionsAddeditComponent } from './permisssions-addedit/permisssions-addedit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PermisssionsListComponent,
    PermisssionsAddeditComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class PermissionsModule { }
