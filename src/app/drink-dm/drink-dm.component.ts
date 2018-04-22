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
  drinkAdd: data1Info[] = [];
  index: number;
  inputName: string;
  addPriceSum: number;
  addList: any[] = [];
  addListName: any[] = [];
  inputRemark: string;
  addChecked: boolean;
  copyText: string;
  id: string;
  url: string;
  talk: boolean;
  constructor(
    private drinkService: DrinkService,
    private router: Router,
    private route: ActivatedRoute,
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
      this.drinkAdd.forEach(i => i.addCheck = false);
    });
  }

  addCheck(add) {
    if (add.addCheck) {
      this.addList.push(add.price);
      this.addListName.push(add.name);
    } else if (this.drinkAdd.forEach(i => i.addCheck === false)) {
      this.addList.forEach(i => i = 0);
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
    this.talk = true;
    let idi = this.drinkService.create();
    if (!this.inputRemark) {
      this.inputRemark = "";
    }
    if (this.drinkAdd.every(i => i.addCheck === false)) {
      this.addPriceSum = 0;
    }
    sum = (this.drinkItem.price + this.addPriceSum) * this.index;
    this.drinkService.addData(this.id, {
      'id': idi,
      'name': this.inputName,
      'drinkName': this.drinkItem.name,
      'add': this.addListName,
      'price': sum,
      'remark': this.inputRemark,
      'quantity': this.index
    });
    this.drinkItem.name = '';
    this.drinkItem.price = 0;
    this.inputName = '';
    this.inputRemark = '';
    this.addChecked = false;
    this.index = 1;
    this.getData();
  }

  goList() {
    this.router.navigate([`drink/drinklist/${this.id}`]);
  }

  // create() {
  //   this.id = this.drinkService.create();
  //   this.url = `drink/${this.id}`;
  // }

  goHome(){
    this.router.navigate(['drink/home']);
  }
}
