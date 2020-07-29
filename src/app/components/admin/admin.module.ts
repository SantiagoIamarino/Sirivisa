import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADMIN_ROUTES } from './admin.routes';
import { AdminComponent } from './admin.component';
import { CatergoriesComponent } from './catergories/catergories.component';
import {FileUploadModule} from 'primeng/fileupload';
import {EditorModule} from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { PostsComponent } from './posts/posts.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { TempImgPipe } from '../../pipes/temp-img.pipe';
import { LoginComponent } from '../../admin/login/login.component';
import { ManageAboutComponent } from './manage-about/manage-about.component';



@NgModule({
  declarations: [
    AdminComponent,
    CatergoriesComponent,
    ManageCategoriesComponent,
    PostsComponent,
    ManagePostsComponent,
    TempImgPipe,
    LoginComponent,
    ManageAboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ADMIN_ROUTES,
    HttpClientModule,
    FileUploadModule,
    EditorModule,
    ProgressBarModule
  ]
})
export class AdminModule { }
