import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe((res: any) => {
        this.categories = res.categories;
      });
  }

  editCategory(categoryId: string) {
    this.router.navigate(['admin', 'category', categoryId]);
  }

  deleteCategory(categoryId: string) {
    swal('Are you sure that you want to delete this category?', {
      buttons: ['Cancel', 'Delete'],
      icon: 'warning'
    }).then( wantsToDelete => {
      if (wantsToDelete) {
        this.categoriesService.deleteCategory(categoryId)
          .subscribe((res: any) => {
            swal('Success', res.message, 'success');
            this.getCategories();
          });
      }
    });
  }

}
