import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/register-page/register-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { NotFoundPageComponent } from './not-found-page.component';

const routes: Routes = [
  // Rutas de autenticacion (carga directa - no lazy)
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  // Rutas publicas
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./features/services-catalog/services-catalog.module').then(m => m.ServicesCatalogModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./features/ratings/ratings.module').then(m => m.RatingsModule)
  },
  // Rutas privadas - ciudadano
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  // Historial de solicitudes - ciudadano
  {
    path: 'my-requests',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'citizen' },
    loadChildren: () => import('./features/my-requests/my-requests.module').then(m => m.MyRequestsModule)
  },
  // Rutas privadas - prestador
  {
    path: 'provider',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'provider' },
    loadChildren: () => import('./features/providers/providers.module').then(m => m.ProvidersModule)
  },
  // Rutas admin
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  // Rutas de reportes
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule)
  },
  // Ruta 404
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }