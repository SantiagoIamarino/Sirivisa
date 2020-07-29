import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesModule } from './components/pages/pages.module';
import { APP_ROUTES } from './app.routes';
import { AdminModule } from './components/admin/admin.module';
import { LoadingComponent } from './components/loading/loading.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    AdminModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
