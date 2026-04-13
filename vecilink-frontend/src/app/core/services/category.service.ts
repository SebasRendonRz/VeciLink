import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models';
import { ApiBaseService, ApiResponse } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ApiBaseService {
  constructor(http: HttpClient) { super(http); }

  listCategories(): Observable<Category[]> {
    return this.unwrap(this.http.get<ApiResponse<Category[]>>(`${this.baseUrl}/categories`));
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.unwrap(this.http.post<ApiResponse<Category>>(`${this.baseUrl}/categories`, category));
  }

  editCategory(id: number, data: Partial<Category>): Observable<Category> {
    return this.unwrap(this.http.put<ApiResponse<Category>>(`${this.baseUrl}/categories/${id}`, data));
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`).pipe(map(() => true));
  }
}
