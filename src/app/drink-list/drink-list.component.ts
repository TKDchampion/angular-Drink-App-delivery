import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DrinkService } from '../drink-dm/drink.service';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./style.scss']
})
export class DrinkListComponent {

  allSum: number;
  allQuantity: number;
  items: any[];
  constructor(private router: Router, private drinkService: DrinkService) {
    this.getList();
  }

  getList() {
    this.drinkService.getDataList().subscribe(resp => {
      this.items = resp;
      this.sum();
    });
  }

  sum() {
    this.allSum = 0;
    this.allQuantity = 0;
    this.items.forEach(i => {
      this.allSum += i.price;
      this.allQuantity += i.quantity;
    });
  }

  goOrder() {
    this.router.navigate(['/drink']);
  }

}
