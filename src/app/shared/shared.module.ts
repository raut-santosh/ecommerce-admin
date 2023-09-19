import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload/fileupload.component';

@NgModule({
  declarations: [
    FileuploadComponent
  ],
  exports: [
    FileuploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
