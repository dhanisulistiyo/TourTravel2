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
  id;
  typeperson;
	typeid;
  guestype;
  constructor() {
    window.console.log("Making a Guest Details.");
    this.id = null;
	  this.typeid = null;
    this.guestype = null;

    this.typeperson = null;
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


  createGuest(adult,child,infant, type){
    let count = adult+child+infant
      this.Guest = []
      if(type == "Large Group"){
        let g = new GuestDetails();
        g.typeperson = "Adult"
        g.guestype= "TOURLEADER";
        this.Guest[0]=(g);
      }else{
        for(let i = 0 ; i < count; i++){
          let g = new GuestDetails();
          if(i < adult)g.typeperson = "Adult"
          else if(i > adult-1 && i < (adult+child))g.typeperson = "Child"  
          else if(i > adult+child-1 && i < (count))g.typeperson = "Infant" 

          if(i == 0) g.guestype= "TOURLEADER";
          else  g.guestype= "TOURMEMBER";
          this.Guest[i]=(g);
        }
      }
  }

  addGuest(){
    let g = new GuestDetails();
    this.Guest.push(g);
  }

  setId(i, par){
      this.Guest[i].id = par;
      console.log(this.Guest)
  }

  setTypeId(i, par){
      this.Guest[i].typeid = par;
      console.log(this.Guest)
  }

  setGuesType(i, par){
      this.Guest[i].guestype = par;
      console.log(this.Guest)
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
