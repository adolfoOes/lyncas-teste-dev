import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  isLoadind = false;
  dataSourceFav: any[] = [];

  constructor(public restAPI: RestApiService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.dataSourceFav = [];
    this.isLoadind = true;
    return this.restAPI.getFavoriteBooks().subscribe((data: any) => {
      this.dataSourceFav = data.items;
      this.isLoadind = false;
    }, err => {
      this.isLoadind = false;
    });
  }

  toggleFavorite(args: any, isFavorite: boolean) {
    this.isLoadind = true;

    if (isFavorite) {
      return this.restAPI.deleteFavoriteBook(args.id).subscribe((data: any) => {

        this.dataSourceFav = this.dataSourceFav.filter(x => x.id != args.id);
        this.isLoadind = false;

        console.log(this.dataSourceFav);

      }, err => {
        this.isLoadind = false;
      });
    }
    else {
      return this.restAPI.postFavoriteBook(args.id).subscribe((data: any) => {
        this.dataSourceFav.push(args);
        this.isLoadind = false;

        console.log(this.dataSourceFav);

      }, err => {
        this.isLoadind = false;
      });
    }
  }

}
