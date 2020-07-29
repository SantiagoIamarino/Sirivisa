import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'about-me', component: AboutMeComponent },
            { path: 'post/:id', component: PostComponent },
            { path: '', pathMatch: 'full', redirectTo: 'home' },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(routes);
