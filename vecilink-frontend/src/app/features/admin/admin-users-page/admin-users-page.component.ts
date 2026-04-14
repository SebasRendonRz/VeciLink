import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css'],
  standalone: false
})
export class AdminUsersPageComponent implements OnInit {
  users: User[] = [];
  filtered: User[] = [];
  isLoading = true;
  filterRole = '';
  filterStatus = '';
  confirmDeleteId: number | null = null;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.listUsers().pipe(finalize(() => this.isLoading = false)).subscribe(data => {
      this.users = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filtered = this.users.filter(u => {
      const roleOk = this.filterRole ? u.role === this.filterRole : true;
      const statusOk = this.filterStatus !== ''
        ? String(u.isActive) === this.filterStatus
        : true;
      return roleOk && statusOk;
    });
  }

  toggleStatus(user: User): void {
    const newStatus = !user.isActive;
    this.userService.toggleStatus(user.id, newStatus).subscribe({
      next: () => {
        const idx = this.users.findIndex(u => u.id === user.id);
        if (idx > -1) this.users[idx] = { ...this.users[idx], isActive: newStatus };
        this.applyFilters();
        this.alertMessage = `Usuario ${newStatus ? 'activado' : 'desactivado'} correctamente.`;
        this.alertType = 'success';
      },
      error: () => {
        this.alertMessage = 'No se pudo actualizar el estado del usuario.';
        this.alertType = 'danger';
      }
    });
  }

  requestDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId === null) return;
    this.userService.deleteUser(this.confirmDeleteId).subscribe(ok => {
      if (ok) {
        this.users = this.users.filter(u => u.id !== this.confirmDeleteId);
        this.applyFilters();
        this.alertMessage = 'Usuario eliminado correctamente.';
        this.alertType = 'success';
      } else {
        this.alertMessage = 'No se pudo eliminar el usuario.';
        this.alertType = 'danger';
      }
      this.confirmDeleteId = null;
    });
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }
}
