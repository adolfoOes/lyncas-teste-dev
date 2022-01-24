import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { RestApiService } from './rest-api.service';



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
