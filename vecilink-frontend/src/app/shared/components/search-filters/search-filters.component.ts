import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models';

export interface SearchFilters {
  keyword: string;
  categoryId: number | null;
  neighborhood: string;
}

@Component({
  selector: 'app-search-filters',
  standalone: false,
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<SearchFilters>();
  filterForm!: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      keyword: [''],
      categoryId: [null],
      neighborhood: ['']
    });

    this.categoryService.listCategories().subscribe(cats => {
      this.categories = cats;
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.filtersChanged.emit(values);
    });
  }

  clearFilters(): void {
    this.filterForm.reset({ keyword: '', categoryId: null, neighborhood: '' });
  }
}
