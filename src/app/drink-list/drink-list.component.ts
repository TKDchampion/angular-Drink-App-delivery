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
  ids: any[];
  id: string;
  blue: boolean;
  constructor(private router: Router, private drinkService: DrinkService, private route: ActivatedRoute, ) {
    this.getList();
  }

  getList() {
    this.id = this.route.params['_value']['id'];
    this.drinkService.getDataList(this.id).subscribe(resp => {
      this.items = resp;
      this.sum();
      this.drinkService.getCollactionIdList().subscribe(resp => {
        let ids: any[] = resp;
        ids = ids.filter(i => i.id === this.id);
        let adress: string = ids[0].adress;
        let yellow: boolean = ids[0].yellow;
        this.blue = ids[0].blue;
        let green: boolean = ids[0].green;
        // console.log(adress)
        this.drinkService.addCollactionId({
          id: this.id,
          adress: adress,
          yellow: yellow,
          blue: this.blue,
          green: green,
          allSum: this.allSum,
          allQuantity: this.allQuantity
        });
      });
    });
  }

  sum() {
    let id: any[];
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

  delete(idi) {
    this.drinkService.delete(this.id, idi);
  }

}
