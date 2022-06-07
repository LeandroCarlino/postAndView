import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/shared/home/home.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDataService } from 'src/app/services/json-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './module/material-module/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostListComponent,
    PostDetailComponent,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ JsonDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
