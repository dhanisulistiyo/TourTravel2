
import { ConfigProvider } from './config';
import { AuthService } from '../providers/auth-token-service'
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
  Guest: any = [];
  TGuest;
  allocation;

  constructor(public http: Http, public auth:AuthService, public config:ConfigProvider) {
    console.log('Hello FixedPackageProvider Provider');
    this.http = http;
  }

  showFixedPackage() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer' +token);
    var url = this.config.baseUrl+'/BookingTemplates/GetTemplates/FixedPackage'
    var response = this.http.get(url, {headers:headers}).map(res => res.json());
    return response;
  }

  createGuest(adult, child, infant) {
    let count = adult + child + infant
    this.Guest = [];
    for (let i = 0; i < count; i++) {
      let g = new GuestDetails();
      g.typeid = "IDCARD";
      g.id = '22222'

      if (i < adult) g.typeperson = "Adult"
      else if (i > adult - 1 && i < (adult + child)) g.typeperson = "Child"
      else if (i > adult + child - 1 && i < (count)) g.typeperson = "Infant"
      if (i == 0) g.guestype = "TOURLEADER";
      else g.guestype = "TOURMEMBER";
      this.Guest[i] = (g);
    }
  }

  setId(i, par) {
    this.Guest[i].id = par;
    console.log(this.Guest)
  }

  setTypeId(i, par) {
    this.Guest[i].typeid = par;
    console.log(this.Guest)
  }

  setGuesType(i, par) {
    this.Guest[i].guestype = par;
    console.log(this.Guest)
  }

  setFirstName(i, par) {
    this.Guest[i].firstName = par;
    console.log(this.Guest)
  }

  setLastName(i, par) {
    this.Guest[i].lastName = par;
    console.log(this.Guest)
  }

  setCountry(i, par) {
    this.Guest[i].country = par;
    console.log(this.Guest)
  }

  public setRoomAllo(aloc) {
    this.allocation = aloc;
  }

  public setGuest(guest) {
    this.TGuest = guest;
  }



}


