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
  open: boolean = false;
  adress: string;
  inputText: string;
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
        this.adress = ids[0].adress;
        let yellow: boolean = ids[0].yellow;
        this.blue = ids[0].blue;
        let green: boolean = ids[0].green;
        // console.log(adress)
        this.drinkService.addCollactionId({
          id: this.id,
          adress: this.adress,
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

  openBtn() {
    this.open = !this.open;
  }

  ok() {
    let re = /^\d{5}$/;
    if (!re.test(this.inputText)) {
      alert("只能輸入5個整數數字");
    } else {
      let txt = confirm("按下訂單送出後就無法在編輯訂單確定嗎?")
      if (txt == true) {
        this.drinkService.addCollactionIdUpdate({
          id: this.id,
          adress: this.adress,
          yellow: false,
          blue: true,
          green: false,
          allSum: this.allSum,
          allQuantity: this.allQuantity,
          atm: this.inputText
        });
        alert("訂單已送出!!")
        this.inputText = '';
        this.open = false;
      }
    }

  }

}
