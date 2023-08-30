import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TemplateRoutingModule } from './template-routing.module';
import { CardsComponent } from './cards/cards.component';


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    NgbModule
  ]
})
export class TemplateModule { }
