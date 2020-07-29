import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { BACKEND_URL } from '../config/config';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getCategoryById(categoryId) {
    const url = BACKEND_URL + '/categories/' + categoryId;

    return this.http.get(url);
  }

  getCategories() {
    const url = BACKEND_URL + '/categories';

    return this.http.get(url);
  }

  uploadCategorie(category: Category) {
    let url = BACKEND_URL + '/categories/';
    url += '?token=' + this.loginService.token;

    return this.http.post(url, category);
  }

  editCategory(category: Category) {
    let url = BACKEND_URL + '/categories/' + category._id;
    url += '?token=' + this.loginService.token;

    return this.http.put(url, category);
  }

  deleteCategory(categoryId: string) {
    let url = BACKEND_URL + '/categories/' + categoryId;
    url += '?token=' + this.loginService.token;

    return this.http.delete(url);
  }
}
