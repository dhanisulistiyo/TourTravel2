import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IteneraryReadyProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IteneraryReadyProvider {
    //versi 2
    startdate;
    tourtype;
    grouptype;
  constructor(public http: Http) {
    console.log('Hello IteneraryReadyProvider Provider');
  }


  public setGroupType(ty){
    this.grouptype = ty;
  }
  public getGroupType(){
    return this.grouptype
  }
  public setTourType(ty){
    this.tourtype = ty;
  }
  public getTourType(){
    return this.tourtype;
  }

  public setDateTour(date) {
    this.startdate = date;
  }
  public getDateTour(date) {
    return this.startdate;
  }

}
