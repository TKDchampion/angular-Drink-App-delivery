import { Component } from '@angular/core';
import { DrinkService } from '../drink-dm/drink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-admin',
  templateUrl: './drink-admin.component.html',
  styleUrls: ['./style.scss']
})
export class DrinkAdminComponent {
  yellow: boolean = true;
  blue: boolean;
  green: boolean;
  items: any[];
  list: any[] = [];
  viewList: any[] = [];
  collaction: any;
  collactionId: any[] = [];
  idss: any[] = [];

  constructor(private drinkService: DrinkService, private router: Router) {
    this.getList();
  }

  getList() {
    this.drinkService.getCollactionIdList().subscribe(resp => {
      this.collaction = resp;
      this.collaction.forEach(i => {
        this.collactionId.push(i.id);
        this.drinkService.getDataList(i.id).subscribe(resp => {
          this.items = resp;
          this.list.push({
            id: i.id,
            adress: i.adress,
            yellow: i.yellow,
            blue: i.blue,
            green: i.green,
            allQuantity: i.allQuantity,
            allSum: i.allSum,
            items: this.items
          });
          this.viewList = this.list;
        });
      });
    })
  }

  searchGroup(text){
    this.list =  this.viewList.filter(item => item.id.toUpperCase().includes(text.toUpperCase()));
  }

  ok(object) {
    object.yellow = false;
    object.blue = true;
    object.green = false;
    this.drinkService.addCollactionIdUpdate({
      id: object.id,
      adress: object.adress,
      yellow: object.yellow,
      blue: object.blue,
      green: object.green,
      allQuantity: object.allQuantity,
      allSum: object.allSum,
    }).then(resp => this.reflash());
  }

  finish(object) {
    object.yellow = false;
    object.blue = false;
    object.green = true;
    this.drinkService.addCollactionIdUpdate({
      id: object.id,
      adress: object.adress,
      yellow: object.yellow,
      blue: object.blue,
      green: object.green,
      allQuantity: object.allQuantity,
      allSum: object.allSum,
    }).then(resp => this.reflash());
  }

  cancel(object) {
    object.yellow = true;
    object.blue = false;
    object.green = false;
    this.drinkService.addCollactionIdUpdate({
      id: object.id,
      adress: object.adress,
      yellow: object.yellow,
      blue: object.blue,
      green: object.green,
      allQuantity: object.allQuantity,
      allSum: object.allSum,
    }).then(resp => this.reflash());
  }

  goOrder(id) {
    this.router.navigate([`drink/drinklist/${id}`]);
  }

  delete(id) {
    let r = confirm("確定刪除整筆訂單？")
    let ids = this.list.filter(i => i.id === id);
    ids[0].items.forEach(i => this.idss.push(i.id))
    // console.log(this.idss)
    if (r == true) {
      this.idss.forEach(i => this.drinkService.delete(id, i));
      this.drinkService.delete('admin', id).then(resp => this.reflash());
    }
  }

  reflash(){
    window.location.reload();
  }
}
