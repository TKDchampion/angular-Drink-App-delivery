import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./style.scss']
})
export class DrinkListComponent {

  items: Observable<any[]>;
  allSum: number;
  allQuantity: number;
  constructor(db: AngularFirestore, private router: Router) {
    this.items = db.collection('drink').valueChanges();
    this.sum();
  }

  sum(){
    this.allSum = 0;
    this.allQuantity = 0;
    this.items.forEach(i => i.forEach(x => {
      this.allSum += x.price;
      this.allQuantity += x.quantity;
    }));
  }

  goOrder(){
    this.router.navigate(['/drink']);
  }

}
