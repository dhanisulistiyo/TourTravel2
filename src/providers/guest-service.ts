import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GuestServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export class GuestDetails {

  firstName;
  lastName;
  country;
  constructor() {
    window.console.log("Making a Guest Details.");
    this.firstName = null;
    this.lastName = null;
    this.country = null;
  }
}


@Injectable()
export class GuestServiceProvider {
  Guest: any = [];
  constructor(public http: Http) {
    console.log('Hello GuestServiceProvider Provider');
  }


  createGuest(count, type){
      this.Guest = []
      if(type == "Large Group"){
        let g = new GuestDetails();
        this.Guest[0]=(g);
      }else{
        for(let i = 0 ; i < count; i++){
          let g = new GuestDetails();
          this.Guest[i]=(g);
        }
      }
  }

  addGuest(){
    let g = new GuestDetails();
    this.Guest.push(g);
  }

  setFirstName(i, par){
      this.Guest[i].firstName = par;
      console.log(this.Guest)
  }

  setLastName(i, par){
      this.Guest[i].lastName = par;
      console.log(this.Guest)
  }

  setCountry(i, par){
      this.Guest[i].country = par;
      console.log(this.Guest)
  }

}
