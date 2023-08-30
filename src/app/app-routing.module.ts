import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/services/auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { LayoutsModule } from './layouts/layouts.module';
import { TemplateModule } from './template/template.module';

const routes: Routes = [
  {
    path: '', // Default route
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    // Lazy loading of DashboardModule when accessing '/dashboard'
    canActivate: [AuthGuard],
  },
  {
    path: 'templates',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule),
    // Lazy loading of TemplateModule when accessing '/templates'
    canActivate: [AuthGuard],
  },
  {
    path: 'layouts',
    loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule),
    // Lazy loading of LayoutsModule when accessing '/layouts'
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // Lazy loading of AuthModule when accessing '/auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
