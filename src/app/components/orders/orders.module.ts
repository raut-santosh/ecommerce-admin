import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersAddeditComponent } from './orders-addedit/orders-addedit.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [
    OrdersAddeditComponent,
    OrdersListComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class OrdersModule { }
