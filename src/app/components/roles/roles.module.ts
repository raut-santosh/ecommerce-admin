import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesAddeditComponent } from './roles-addedit/roles-addedit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    RolesListComponent,
    RolesAddeditComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class RolesModule { }
