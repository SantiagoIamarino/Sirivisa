import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FilesService } from '../../../services/files.service';
import { FileUpload } from 'primeng/fileupload/fileupload';
import { Category } from '../../../models/category.model';
import swal from 'sweetalert';
import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

// declare var swal;

@Component({
  selector: 'app-catergories',
  templateUrl: './catergories.component.html',
  styleUrls: ['./catergories.component.css']
})
export class CatergoriesComponent implements OnInit {

  uploadedFiles = [];
  mobileUploadedFiles = [];

  category: Category = new Category();

  editMode = false;

  constructor(
    public filesService: FilesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.categoryId) {
        this.category._id = params.categoryId;
        this.editMode = true;
        this.getCategory(this.category._id);
      }
    });
  }

  getCategory(categoryId) {
    this.categoriesService.getCategoryById(categoryId)
      .subscribe((res: any) => {
        this.category = res.category;
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

  myUploader(event, isMobile = false) {
    if (this.verifyFiles(event.files)) {
      swal('Error', '.MOV files are not compatible', 'error');
      return;
    }
    if (!isMobile) {
      this.filesService.uploadFiles(event.files).subscribe((res: any) => {
          this.uploadedFiles = res.uploads;
          this.filesService.uploading = false;
      }, (error) => {
        swal('Error', error.error.error.message, 'error');
        this.filesService.uploading = false;
      });
    } else {
      this.filesService.uploadMobileFiles(event.files).subscribe((res: any) => {
          this.mobileUploadedFiles = res.uploads;
          this.filesService.uploadingMobile = false;
      }, (error) => {
        swal('Error', error.error.error.message, 'error');
        this.filesService.uploadingMobile = false;
      });
    }
  }

  removeFile(file: File, uploader: FileUpload) {
    const index = uploader.files.indexOf(file);
    uploader.remove(null, index);
  }

  uploadCategory() {

    if (!this.category.name) {
      swal('Error', 'You have to set a category name', 'error');
      return;
    }

    if (this.uploadedFiles.length === 0) {
      if (!this.editMode) {
        swal('Error', 'You have to set a category background', 'error');
        return;
      }
    } else {
      this.category.background = this.uploadedFiles[0];
    }

    if (this.mobileUploadedFiles.length === 0) {
      if (!this.editMode) {
        swal('Error', 'You have to set a mobile category background', 'error');
        return;
      }
    } else {
      this.category.mobileBackground = this.mobileUploadedFiles[0];
    }

    if (!this.category.description) {
      swal('Error', 'You have to set a category description', 'error');
      return;
    }

    if (this.editMode) {
      this.editCategory();
      return;
    }

    this.categoriesService.uploadCategorie(this.category)
      .subscribe((res: any) => {
        swal('Success', 'Category uploaded succesfully', 'success');
        this.router.navigate(['admin', 'manage-categories']);
      });
  }

  editCategory() {
    this.categoriesService.editCategory(this.category)
      .subscribe((res: any) => {
        swal('Sucess', res.message, 'success');
        this.router.navigate(['admin', 'manage-categories']);
      });
  }

}
