import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/post.model';
import { LoadingService } from '../../../services/loading.service';

import swal from 'sweetalert';


declare function navigate(scrollTo, nextPage, isMobile);
declare function leftNavigate(scrollTo, page);
declare var currentPage;
declare function postsNavigate(categoryId, action);
declare function changeImage(categoryIndex, postIndex, imageIndex, postImages);
declare function changePostImageState(imagen, action);
declare function slideCategories();
declare function setHtmlHidden();
declare function removeHtmlHidden();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './mobile-styles.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  categoryActive = 0;

  posts: Post[] = [];

  categoryIndex = 0;

  constructor(
    private categoriesService: CategoriesService,
    private postsService: PostsService,
    private loadingService: LoadingService
  ) {
    this.getCategories();
    this.loadingService.loading = true;
   }

  ngOnInit() {
    setHtmlHidden();
  }

  ngOnDestroy() {
    removeHtmlHidden();
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe((res: any) => {
        this.categories = res.categories;
        this.getPosts(0);
        console.log(this.categories);
      });
  }

  getPosts(index) {
    this.postsService.getPostsByCategory(this.categories[index]._id)
      .subscribe((res: any) => {
        this.posts = res.posts;
      });
  }

  leftNavigation(index: number) {
    leftNavigate(index + 1, index + 1);
    this.getPosts(index);
  }

  navigation(index: number, isMobile = false) {
    navigate(index + 1, index + 1, isMobile);
    this.getPosts(index);
  }

  postsNavigation(index: number, action: string) {
    postsNavigate('category_' + (index + 1), action);
  }

  changingImage(categoryIndex: number, postIndex: number, imageIndex: number, postImages: any[]) {
    changeImage(categoryIndex, postIndex, imageIndex, postImages);
  }

  onImageCoverLoad(index) {
    if (index === 0) { // First image is loaded
      this.loadingService.loading = false;
    }
  }

  onImageLoad(event) {
    changePostImageState(event.target, 'remove');
  }

  slidingCategories() {
    slideCategories();
  }

  changeCategory(index) {
    this.categoryIndex = index;
    this.getPosts(index);
    this.slidingCategories();
  }

  mobileCategoryChanged(data) {
    const action = data.value;

    if (action === 'down') {
      if (currentPage < this.categories.length) {
        currentPage++;
      }
    } else {
      if (currentPage > 1) {
        currentPage--;
      }
    }

    this.navigation((currentPage - 1), true);
  }

}
