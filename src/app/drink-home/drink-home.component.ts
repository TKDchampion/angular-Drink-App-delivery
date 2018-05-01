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
  account: string;
  password: string;
  number: any;
  compar: boolean;
  openButton: boolean = false;
  constructor(private drinkService: DrinkService, private router: Router) {
    this.drinkService.getDataList("number").subscribe(resp => {
      this.number = resp
    });
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

  open(){
    this.openButton = !this.openButton;
  }

  comparison(){
    if(this.account === this.number.account && this.password === this.number.password && this.account && this.password){
      this.router.navigate([`drink/admin`]);
    }else{
      alert("帳密錯誤")
    }
  }
}
