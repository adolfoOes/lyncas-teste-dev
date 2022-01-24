import { Component, OnInit, ViewChild } from '@angular/core';
import { TextBox, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('search', { static: true }) public searchInput: TextBox | undefined;

  isLoadind = false;
  dataSource: any[] = [];
  dataSourceFav: any[] = [];

  constructor(public restAPI: RestApiService) { }

  ngOnInit(): void {

  }

  buttonSearch() {
    if (this.searchInput?.element.value != null && this.searchInput?.element.value.length > 0) {
      this.getBooks(this.searchInput?.element.value);
    }
  }

  getBooks(term: string) {
    this.dataSource = [];
    this.isLoadind = true;
    return this.restAPI.getBooks(term).subscribe((data: any) => {
      this.dataSource = data.items;
      this.isLoadind = false;
      this.getFavorites();
    }, err => {
      this.isLoadind = false;
    });
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

  isFavorite(book: any) {
    var bookObj = this.dataSourceFav.filter(x => x.id == book.id)[0] ?? null;
    if (bookObj != null) {
      return true;
    } else {
      return false;
    }
  }

}
