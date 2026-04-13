import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  unreadCount = 0;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.notificationService.countUnread(user.id).subscribe(count => {
          this.unreadCount = count;
        });
      } else {
        this.unreadCount = 0;
      }
    });
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }

  closeMenu(): void {
    if (window.innerWidth >= 992) {
      return;
    }

    const navbar = document.getElementById('navbarMain');
    if (!navbar || !navbar.classList.contains('show')) {
      return;
    }

    const bootstrapApi = (globalThis as { bootstrap?: { Collapse: { getOrCreateInstance: (element: Element) => { hide: () => void } } } }).bootstrap;
    bootstrapApi?.Collapse.getOrCreateInstance(navbar).hide();
  }

  get firstName(): string {
    return this.currentUser?.fullName?.split(' ')[0] ?? 'Mi cuenta';
  }

  get isProvider(): boolean {
    return this.currentUser?.role === 'provider';
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}
