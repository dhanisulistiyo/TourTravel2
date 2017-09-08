import { GuestServiceProvider } from './guest-service';

import { ConfigProvider } from './config';
import { AuthService } from '../providers/auth-token-service'
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

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
export class FixedPackageProvider {
  TGuest;
  guest: Array<any>;
  allocation;
  id
  constructor(public http: Http, public auth:AuthService, public config:ConfigProvider, public gu: GuestServiceProvider ) {
    console.log('Hello FixedPackageProvider Provider');
    this.http = http;
  }

  showFixedPackage() {
    var headers = new Headers();    
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.config.baseUrl+'/BookingTemplates/GetTemplates/FixedPackage/All'
    var response = this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }

  showFixedPackageByFilter(type) {
    var headers = new Headers();    
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.config.baseUrl+'/BookingTemplates/GetTemplates/FixedPackage/ByTourType/'+type
    var response = this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }

  public setRoomAllo(aloc) {
    this.allocation = aloc;
  }

  public setGuest(guest) {
    this.TGuest = guest;
  }

  public setId(id) {
    this.id = id;
  }
  detailsPackage(id){
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' +token);
    var url = this.config.baseUrl+'/BookingTemplates/GetTemplates/FixedPackage/'+id;
    var response = this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }

  memberGuest(){
    this.guest= [];
    for (let i = 0; i < (Object.keys(this.gu.Guest).length); i++) {
      let a = this.gu.Guest[i];
      // if(a.firstName != null && a.lastName != null && a.id != null && a.typeid != null && a.guestype != null && a.country != null){
      if(a.firstName != null && a.lastName != null && a.country != null){
       let item = {
            FirstName : a.firstName,
            LastName : a.lastName,
            CountryId :  a.country.Id,
            IdentityNbr :  a.id,
            IdentityType :  a.typeid,
            GuestType :  a.guestype,  
            GuestCategory : a.typeperson
          }
        this.guest.push(item);
      }
      
    }

}

  joinTour(){
    this.memberGuest();
    var json = {
      "AdultPax":this.TGuest.AdultQty,
      "ChildPax":this.TGuest.ChildQty,
      "InfantPax":this.TGuest.InfantQty,
      "RoomAllocation":{
        "SharingRoomQty":this.allocation.SharingRoomPrice,
        "SingleRoomQty": 0,
        "ExtraBedQty": this.allocation.AdultExtraBedPrice,
        "ChildExtraBedQty":this.allocation.ChildExtraBedPrice,
        "SharingBedQty":this.allocation.SharingBedPrice,
        "BabyCrib":0,
        "NoBed":0
      },
      "Guests": this.guest
    };
    console.log(JSON.stringify(json));
    let token = this.auth.AuthToken;
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    var url = this.config.baseUrl+'/TourTransactions/JoinTour/'+this.id;
    var response = this.http.post(url, json, options).map(res => res).subscribe(data => {
      console.log(data.json())
    });
    return response;
  }
}


