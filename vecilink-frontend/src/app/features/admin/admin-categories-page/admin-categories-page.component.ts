import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-admin-categories-page',
  templateUrl: './admin-categories-page.component.html',
  styleUrls: ['./admin-categories-page.component.css'],
  standalone: false
})
export class AdminCategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  isLoading = true;
  showForm = false;
  editingId: number | null = null;
  formData: { name: string; icon: string; description: string; isActive: boolean } = { name: '', icon: '', description: '', isActive: true };
  confirmDeleteId: number | null = null;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.listCategories().pipe(finalize(() => this.isLoading = false)).subscribe(data => {
      this.categories = data;
    });
  }

  openCreate(): void {
    this.editingId = null;
    this.formData = { name: '', icon: '', description: '', isActive: true };
    this.showForm = true;
  }

  openEdit(cat: Category): void {
    this.editingId = cat.id;
    this.formData = { name: cat.name, icon: cat.icon ?? '', description: cat.description ?? '', isActive: cat.isActive };
    this.showForm = true;
  }

  saveForm(): void {
    if (!this.formData.name.trim()) return;
    if (this.editingId !== null) {
      this.categoryService.editCategory(this.editingId, this.formData).subscribe(updated => {
        if (updated) {
          const idx = this.categories.findIndex(c => c.id === updated!.id);
          if (idx > -1) this.categories[idx] = updated!;
        }
        this.alertMessage = 'Categoría actualizada.';
        this.alertType = 'success';
        this.showForm = false;
      });
    } else {
      this.categoryService.createCategory(this.formData).subscribe(created => {
        this.categories.push(created);
        this.alertMessage = 'Categoría creada.';
        this.alertType = 'success';
        this.showForm = false;
      });
    }
  }

  requestDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId === null) return;
    this.categoryService.deleteCategory(this.confirmDeleteId).subscribe(ok => {
      if (ok) {
        this.categories = this.categories.filter(c => c.id !== this.confirmDeleteId);
        this.alertMessage = 'Categoría eliminada.';
        this.alertType = 'success';
      } else {
        this.alertMessage = 'No se pudo eliminar la categoría.';
        this.alertType = 'danger';
      }
      this.confirmDeleteId = null;
    });
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }
}
