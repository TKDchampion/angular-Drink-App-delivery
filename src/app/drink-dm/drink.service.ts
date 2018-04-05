import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DrinkService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get('assets/Data/data.json');
  }

  getData1() {
    return this.http.get('assets/Data/data1.json');
  }
}
