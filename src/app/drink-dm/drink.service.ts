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

  addData(id: string, parma: any) {
    return this.db.collection(`${id}`).doc(`${parma.id}`).set(parma);
  }

  create(){
    let id = this.db.createId();
    return id;
  }

  getDataList(id: string) {
    return this.db.collection(`${id}`).valueChanges();
  }

  delete(id:string, idi: any){
    return this.db.collection(`${id}`).doc(`${idi}`).delete();
  }
}
