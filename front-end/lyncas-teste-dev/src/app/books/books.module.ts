import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../shared/shared.module';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { RestApiService } from '../shared/rest-api.service';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
  declarations: [
    FavoritesComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TextBoxAllModule,
    ButtonAllModule,
    DialogAllModule
  ],
  providers: [
    RestApiService
  ]
})
export class BooksModule { }
