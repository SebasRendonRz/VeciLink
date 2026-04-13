import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  standalone: false
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
  isLoading = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const current = this.authService.getCurrentUser();
    if (!current) { this.router.navigate(['/login']); return; }

    this.userService.getProfile(current.id).subscribe(u => {
      this.user = u ?? null;
      this.isLoading = false;
    });
  }

  onProfileUpdated(updated: User): void {
    this.user = updated;
  }
}
