import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './books/favorites/favorites.component';
import { SearchComponent } from './books/search/search.component';

const routes: Routes = [

  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: 'home',
    component: SearchComponent
  },
  {
    path: '**',
    component: SearchComponent
  }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
