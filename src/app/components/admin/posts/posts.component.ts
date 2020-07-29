import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../../services/files.service';
import { FileUpload } from 'primeng/fileupload/fileupload';
import { Post } from '../../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

import swal from 'sweetalert';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  uploadedFiles =  [];
  uploadedFilesMobile =  [];

  post: Post = new Post();
  categories: Category[] = [];

  editMode = false;

  constructor(
    public filesService: FilesService,
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.getCategories();
    this.loadingService.loading = true;
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.postId) {
        this.post._id = params.postId;
        this.editMode = true;
        this.getPost(this.post._id);
      } else {
        this.post.category = 'none';
      }
    });
  }

  getPost(postId) {
    this.postsService.getPostById(postId)
      .subscribe((res: any) => {
        this.post = res.post;
        this.loadingService.loading = false;
      });
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe((res: any) => {
        this.categories = res.categories;
        this.loadingService.loading = false;
      });
  }

  verifyFiles(files) {
    let errors = false;
    files.forEach(file => {
      if (file.type === 'video/quicktime') {
        errors = true;
      }
    });

    return errors;
  }

  myUploader(event) {
    if (this.verifyFiles(event.files)) {
      swal('Error', '.MOV files are not compatible', 'error');
      return;
    }
    this.filesService.uploadFiles(event.files).subscribe((res: any) => {
      this.uploadedFiles = res.uploads;
      this.filesService.uploading = false;
    });
  }

  myUploaderMobile(event) {
    if (this.verifyFiles(event.files)) {
      swal('Error', '.MOV files are not compatible', 'error');
      return;
    }
    this.filesService.uploadMobileFiles(event.files).subscribe((res: any) => {
      this.uploadedFilesMobile = res.uploads;
      this.post.mobileImg = res.uploads[0];
      this.filesService.uploadingMobile = false;
    });
  }

  removeFile(file: File, uploader: FileUpload) {
    const index = uploader.files.indexOf(file);
    uploader.remove(null, index);
  }

  uploadPost() {

    if (!this.post.title) {
      swal('Error', 'You have to set a post name', 'error');
      return;
    }

    if (this.uploadedFiles.length === 0) {
      if (!this.editMode) {
        swal('Error', 'You have to set at least one post image', 'error');
        return;
      }
    } else {
      this.post.images = this.uploadedFiles;
    }

    if (this.uploadedFilesMobile.length === 0) {
      if (!this.editMode) {
        swal('Error', 'You have to set a post mobile image', 'error');
        return;
      }
    } else {
      this.post.images = this.uploadedFiles;
    }

    if (!this.post.text) {
      swal('Error', 'You have to set a post text', 'error');
      return;
    }

    if (this.editMode) {
      this.editPost();
      return;
    }

    this.postsService.uploadPost(this.post)
      .subscribe((res: any) => {
        swal('Success', 'post uploaded succesfully', 'success');
        this.post = new Post();
        this.uploadedFiles = [];
        this.router.navigate(['/admin']);
      });
  }

  editPost() {
    this.postsService.editPost(this.post)
      .subscribe((res: any) => {
        swal('Sucess', res.message, 'success');
      });
  }

}
