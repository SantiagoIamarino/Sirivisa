import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutMeComponent } from './about-me/about-me.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    PostComponent,
    ContactComponent,
    NavbarComponent,
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PAGES_ROUTES,
    ProgressSpinnerModule
  ]
})
export class PagesModule { }
