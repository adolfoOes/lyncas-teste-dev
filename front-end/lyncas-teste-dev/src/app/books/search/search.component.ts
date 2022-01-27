import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModel } from '@syncfusion/ej2-angular-buttons';
import { TextBox, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, PositionDataModel } from '@syncfusion/ej2-angular-popups';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('search', { static: true }) public searchInput: TextBox | undefined;
  @ViewChild('confirmModal', { static: true }) public confirmModal: DialogComponent | undefined;

  isLoadind = false;
  dataSource: any[] = [];
  dataSourceFav: any[] = [];

  dialogWidth = '400px';
  dialogHeigth = '200px';
  contentData = 'Remove book from favorites?';
  position: PositionDataModel = { X: 'center', Y: 'center' };
  buttons: Object[] = [{ click: this.dlgBtnOKClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } },
  { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'CANCEL', isPrimary: false } }];

  argsButton: any = "";
  isFavoriteButton: any = "";

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

  dlgBtnOKClick(args: any) {
    this.toggleFavorite(this.argsButton, this.isFavoriteButton);
    this.confirmModal?.hide();
  }

  dlgBtnClick(args: any) {
    this.confirmModal?.hide();
  }

  showDialog(args: any, isFavorite: boolean) {

    if (isFavorite) {

      this.argsButton = args;
      this.isFavoriteButton = isFavorite;

      this.confirmModal?.show();
    } else {
      this.toggleFavorite(args, isFavorite);
    }
  }

  clickModal(args: any) {
    this.confirmModal?.hide();
  }

  toggleFavorite(args: any, isFavorite: boolean) {
    this.isLoadind = true;

    if (isFavorite) {
      return this.restAPI.deleteFavoriteBook(args.id).subscribe((data: any) => {

        this.dataSourceFav = this.dataSourceFav.filter(x => x.id != args.id);
        this.isLoadind = false;

      }, err => {
        this.isLoadind = false;
      });
    }
    else {
      return this.restAPI.postFavoriteBook(args.id).subscribe((data: any) => {
        this.dataSourceFav.push(args);
        this.isLoadind = false;

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
