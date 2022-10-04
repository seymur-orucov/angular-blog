import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AdminModule } from './layout/admin/admin.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'posts/:id', component: PostsComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./layout/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
