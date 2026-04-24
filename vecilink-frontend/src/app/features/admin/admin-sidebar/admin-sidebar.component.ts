import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  standalone: false
})
export class AdminSidebarComponent {
  navItems = [
    { label: 'Dashboard', icon: 'bi-grid', route: '/admin' },
    { label: 'Usuarios', icon: 'bi-people', route: '/admin/users' },
    { label: 'Servicios', icon: 'bi-briefcase', route: '/admin/services' },
    { label: 'Cupos prestadores', icon: 'bi-sliders', route: '/admin/provider-quotas' },
    { label: 'Categorías', icon: 'bi-tags', route: '/admin/categories' },
    { label: 'Destacados', icon: 'bi-patch-check', route: '/admin/featured' },
    { label: 'Publicidad', icon: 'bi-megaphone', route: '/admin/ads' },
    { label: 'Reportes', icon: 'bi-flag', route: '/admin/reports' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get currentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
