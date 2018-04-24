import { Component } from '@angular/core';
import { DrinkService } from '../drink-dm/drink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-home',
  templateUrl: './drink-home.component.html',
  styleUrls: ['./style.scss']
})
export class DrinkHomeComponent {

  inputName: string;
  inputAdress: string;
  constructor(private drinkService: DrinkService, private router: Router) {

  }

  goOrder() {
    this.inputName = `${this.inputName}` + `${Math.floor(Math.random() * 50)}`;
    this.router.navigate([`drink/${this.inputName}`]);
    this.drinkService.addCollactionId({
      id: this.inputName,
      adress: this.inputAdress,
      yellow: true,
      blue: false,
      green: false,
      allSum: 0,
      allQuantity: 0
    });
  }

}
