import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddeditComponent } from './product-addedit/product-addedit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddeditComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxDatatableModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductsModule { }
