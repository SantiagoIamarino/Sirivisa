import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './components/pages/pages.component';

const routes: Routes = [
    // { path: '**', component: PagesComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
