import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class DrinkService {

  constructor(private http: Http, private db: AngularFirestore) { }

  getData() {
    return this.http.get('assets/Data/data.json');
  }

  getData1() {
    return this.http.get('assets/Data/data1.json');
  }

  addData(id: number,parma: any) {
    return this.db.collection(`${id}`).add(parma);
  }

  getDataList(id: number) {
    return this.db.collection(`${id}`).valueChanges();
  }

}
