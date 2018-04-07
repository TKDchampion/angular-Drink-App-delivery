import { Component } from '@angular/core';
import { DrinkService } from './drink.service';
import { dataInfo, data1Info, Quantity } from './drinkModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drink-dm',
  templateUrl: './drink-dm.component.html',
  styleUrls: ['./style.scss']
})
export class DrinkDmComponent {

  Quantity = Quantity;
  drinkData: dataInfo;
  drinkItem: dataInfo;
  drinkAdd: data1Info;
  index: number;
  inputName: string;
  addPriceSum: number;
  addList: any[] = [];
  addListName: any[] = [];
  inputRemark: string;
  addChecked: boolean;
  copyText: string;
  id: number;
  url: string;
  constructor(
    private drinkService: DrinkService,
    private router: Router,
    private route:ActivatedRoute,
  ) {
    this.index = 1;
    this.getData();
    this.getData1();
    this.copyText = location.href;
    this.id = this.route.params['_value']['id'];
  }

  getData() {
    this.drinkService.getData().subscribe(resp => {
      this.drinkData = resp.json();
    });
  }

  getData1() {
    this.drinkService.getData1().subscribe(resp => {
      this.drinkAdd = resp.json();
    });
  }

  addCheck(add) {
    if (add.addCheck) {
      this.addList.push(add.price);
      this.addListName.push(add.name);
    } else {
      let index = this.addList.findIndex(i => i === add.price);
      this.addList.splice(index, 1);
      this.addListName.splice(index, 1);
    }
    this.addPriceSum = 0;
    this.addList.forEach(i => this.addPriceSum += i);
  }

  quantityBtn(value, index) {
    this.index = index;
    if (value === this.Quantity.add) {
      this.index = this.index + 1;
    }
    if (this.index > 1 && value === this.Quantity.less) {
      this.index = this.index - 1;
    }
  }

  selectDrink(item) {
    this.drinkItem = item;
  }

  sum() {
    let sum;
    if(!this.inputRemark){
      this.inputRemark = "";
    }
    this.index > 0
      ? sum = (this.drinkItem.price + this.addPriceSum) * this.index
      : sum = (this.drinkItem.price + this.addPriceSum)
    this.drinkService.addData(this.id, {
      'name': this.inputName,
      'drinkName': this.drinkItem.name,
      'add': this.addListName,
      'price': sum,
      'remark': this.inputRemark,
      'quantity': this.index
    });
    this.inputName = '';
    this.inputRemark = '';
    this.addChecked = false;
  }

  goList() {
    this.router.navigate([`drink/drinklist/${this.id}`]);
  }

  create() {
    let id = Math.floor(Math.random()*10000000000);
    this.drinkService.addData(id, {
      'name': 0,
      'drinkName': 0,
      'add': 0,
      'price': 0,
      'remark': 0,
      'quantity': 0
    });
    this.url = `drink/${id}`;
  }
}
