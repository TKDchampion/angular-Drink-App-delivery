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
    let str = prompt("請輸入完整地址", "請輸入完整地址");
    if (str) {
      let id = this.drinkService.create();
      this.router.navigate([`drink/${id}`]);
    }
    else {
      alert("您取消了創建訂單");
    }
  }

}
