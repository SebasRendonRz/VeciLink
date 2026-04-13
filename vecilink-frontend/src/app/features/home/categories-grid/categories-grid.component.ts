import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.css']
})
export class CategoriesGridComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(cats => this.categories = cats);
  }

  goToCategory(categoryId: number): void {
    this.router.navigate(['/services'], { queryParams: { categoryId } });
  }
}
