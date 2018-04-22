import { Component } from '@angular/core';
import { DrinkService } from '../drink-dm/drink.service';

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
  collaction: any;
  collactionId: any[] = [];
  constructor(private drinkService: DrinkService) {
    this.getList();
  }

  getList() {
    this.drinkService.getCollactionIdList().subscribe(resp => {
      this.collaction = resp;
      console.log(this.collaction)
      this.collaction.forEach(i => {
        if(i.color === 'blue'){
          this.ok();
        }else if(i.color === 'green'){
          this.finish();
        }else{
          this.cancel();
        }
      });
      this.collaction.forEach(i => {
        this.collactionId.push(i.id);
        this.drinkService.getDataList(i.id).subscribe(resp => {
          this.items = resp;
          this.list.push({id: i.id, items: this.items});
        });
      });
    })
  }

  ok() {
    this.yellow = false;
    this.blue = true;
    this.green = false;
  }

  finish() {
    this.yellow = false;
    this.blue = false;
    this.green = true;
  }

  cancel(){
    this.yellow = true;
    this.blue = false;
    this.green = false;
  }

}
