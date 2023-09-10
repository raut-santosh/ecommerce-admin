import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisssionsListComponent } from './permisssions-list/permisssions-list.component';
import { PermisssionsAddeditComponent } from './permisssions-addedit/permisssions-addedit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: PermisssionsListComponent
  },
  {
    path: 'addedit',
    component: PermisssionsAddeditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
