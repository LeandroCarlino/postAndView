import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InformationComponent } from './pages/information/information.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PostListComponent },
  { path: 'post-detail/:id', component: PostDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'information', component: InformationComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
