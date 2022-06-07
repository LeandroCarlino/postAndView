import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HomeComponent } from './components/shared/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'post-list', component: PostListComponent},
  {path:'post-detail/:id', component: PostDetailComponent},
  {path:'', pathMatch: 'full', component: HomeComponent},
  {path:'**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
