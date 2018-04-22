import { Component } from '@angular/core';
import { DrinkService } from '../drink-dm/drink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-home',
  templateUrl: './drink-home.component.html',
  styleUrls: ['./style.scss']
})
export class DrinkHomeComponent {

  constructor(private drinkService: DrinkService, private router: Router) {

  }

  goOrder() {
    //  let id = this.drinkService.create();
    //  this.router.navigate([`drink/${id}`]);
  }

}
