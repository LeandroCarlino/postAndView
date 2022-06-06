import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { FormComponent } from './components/form/form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HomeComponent } from './components/shared/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'post-list', component: PostListComponent},
  {path:'post-detail/:id', component: PostDetailComponent},
  {path:'comments', component: CommentsComponent},
  {path:'form', component: FormComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
