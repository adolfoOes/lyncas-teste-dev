import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  public menuItems: any[] = [
    {
      route: 'home',
      firstLevel: 'Home'
    },
    {
      route: 'favorites',
      firstLevel: 'Favorites'
    }
  ]

  menuFields: FieldSettingsModel = {
    text: ['firstLevel', 'secondLevel'],
    children: ['nextLevel']
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  select(args: any) {

    var menuSelected: any = args.item.route.toLowerCase();

    if (menuSelected.length > 0) {
      this.router.navigate(['/' + menuSelected]);
    }

  }

}
