import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CatergoriesComponent } from './catergories/catergories.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { PostsComponent } from './posts/posts.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import { LoginComponent } from '../../admin/login/login.component';
import { LoginGuard } from '../../guards/login.guard';
import { ManageAboutComponent } from './manage-about/manage-about.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'posts', canActivate: [ LoginGuard ], component: PostsComponent },
            { path: 'posts/:postId', canActivate: [ LoginGuard ], component: PostsComponent },
            { path: 'manage-posts', canActivate: [ LoginGuard ], component: ManagePostsComponent },
            { path: 'categories', canActivate: [ LoginGuard ], component: CatergoriesComponent },
            { path: 'category/:categoryId', canActivate: [ LoginGuard ], component: CatergoriesComponent },
            { path: 'manage-categories', canActivate: [ LoginGuard ], component: ManageCategoriesComponent },
            { path: 'manage-aboutme', canActivate: [ LoginGuard ], component: ManageAboutComponent },
            { path: '', pathMatch: 'full', redirectTo: 'manage-posts' }
        ]
    },
];

export const ADMIN_ROUTES = RouterModule.forRoot(routes, { useHash: true });
