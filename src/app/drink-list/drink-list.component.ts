import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  id: number;
  constructor(private router: Router, private drinkService: DrinkService, private route: ActivatedRoute,) {
    this.getList();
  }

  getList() {
    this.id = this.route.params['_value']['id'];
    this.drinkService.getDataList(this.id).subscribe(resp => {
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
    this.router.navigate([`/drink/${this.id}`]);
  }

}
