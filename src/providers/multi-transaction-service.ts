import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DailyService } from '../providers/daily-service';
import { IteneraryService } from '../providers/itenerary-service';
import { AuthService } from '../providers/auth-token-service';
import 'rxjs/add/operator/map';

@Injectable()
export class MultiTransactionService {
  daily: any;
  attraction: Array<any>;
  transportation: Array<any>;
  accomodation: Array<any>;
  airport:any;
  constructor(public http: Http, public ds: DailyService, public ite: IteneraryService, public auth: AuthService) {
    console.log('Hello MultiTransactionService Provider');
    this.daily = this.ds.daily
    this.airport = this.ds.transairport
  }

  destroyObject() {
    this.attraction = [];
    this.transportation = [];
    this.accomodation = [];
  }


  dailyAttraction() {
    this.daily = this.ds.daily
    this.attraction = [];
    console.log(this.daily);
    for (let i = 0; i < (Object.keys(this.daily).length); i++) {
      for (let j = 0; j < (Object.keys(this.daily[i].program_daily).length); j++) {
        let cek = this.daily[i].program_daily[j].attraction;
        if (cek != null) {
          for (let k = 0; k < (Object.keys(cek).length); k++) {
            let item = {
              ServiceItemId: this.daily[i].program_daily[j].attraction[k].ServiceItemId,
              Date: this.daily[i].datetour
            }
            this.attraction.push(item);
          }
        }
      }
    }
    //console.log(this.attraction);
  }



  dailyTransportation() {
    this.transportation = [];
    this.daily = this.ds.daily
    console.log(this.airport);

    if((Object.keys(this.airport).length)>0){
      for(let i = 0; i < (Object.keys(this.airport).length); i++){
        if(this.airport[i].transportation != null){
         let item = {
            ServiceItemId: this.airport[i].transportation.ServiceItemId,
            TransportationItemServiceType: this.airport[i].transportservice,
            Date: this.airport[i].date
          }
          this.transportation.push(item);
        }
      }
    }
    
    console.log(this.daily);
    for (let i = 0; i < (Object.keys(this.daily).length); i++) {
      for (let j = 0; j < (Object.keys(this.daily[i].program_daily).length); j++) {
        let cek = this.daily[i].program_daily[j].transportation;
        if (cek != null) {
          let item = {
            ServiceItemId: this.daily[i].program_daily[j].transportation.ServiceItemId,
            TransportationItemServiceType: this.daily[i].program_daily[j].transportservice,
            Date: this.daily[i].datetour
          }
          this.transportation.push(item);

        }
      }
    }
    //console.log(this.attraction);
  }

  dailyAccomodation() {
    this.accomodation = [];
    this.daily = this.ds.daily
    console.log(this.daily);
    for (let i = 0; i < (Object.keys(this.daily).length); i++) {
      for (let j = 0; j < (Object.keys(this.daily[i].program_daily).length); j++) {
        let cek = this.daily[i].program_daily[j].acomodation;
        if (cek != null) {
          let item = {
            ServiceItemId: this.daily[i].program_daily[j].roomtype.ServiceItemId,
            Date: this.daily[i].datetour,
            SharingRoomQty: Number(this.ite.getRoomAllo().allocroom.sharingRooms),
            SingleRoomQty: Number(this.ite.getRoomAllo().allocroom.singleRoom),
            ExtraBedQty: Number(this.ite.getRoomAllo().allocroom.extraBed),
            SharingBedQty: Number(this.ite.getRoomAllo().allocroom.sharingBed),
            AccommodationItemServiceType: this.daily[i].program_daily[j].roomservice
          }
          this.accomodation.push(item);
        }
      }
    }
    //console.log(this.attraction);
  }


  mulDemoTransaction() {
    this.dailyAttraction();
    this.dailyTransportation();
    this.dailyAccomodation();
    var json = {
      "title": this.ite.getToursName(),
      "AdultPaxQty": Number(this.ite.getPassenger().guestTour['AdultQty']),
      "ChildPaxQty": Number(this.ite.getPassenger().guestTour['ChildQty']),
      "InfantPaxQty": Number(this.ite.getPassenger().guestTour['InfantQty']),
      "StartDate": this.ite.getDateTour().ev['monthStart'],
      "EndDate": this.ite.getDateTour().ev['monthEnd'],
      "CityDestinationId": this.ite.getObjectLocation().Id,
      "RegionDestinationId": this.ite.getObjectLocation().Region.Id,
      "Attractions": this.attraction,
      "Transportations": this.transportation,
      "Accommodations": this.accomodation
    };

    console.log(JSON.stringify(json));
    let token = this.auth.AuthToken;
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TourTransactions/DemoPrice';
    var response = this.http.post(url, json, options).map(res => res.json());
    return response;
  }


  getTourTransaksi() {
    this.dailyAttraction();
    this.dailyTransportation();
    this.dailyAccomodation();
    var json = {
      "title": this.ite.getToursName(),
      "AdultPaxQty": Number(this.ite.getPassenger().guestTour['AdultQty']),
      "ChildPaxQty": Number(this.ite.getPassenger().guestTour['ChildQty']),
      "InfantPaxQty": Number(this.ite.getPassenger().guestTour['InfantQty']),
      "StartDate": this.ite.getDateTour().ev['monthStart'],
      "EndDate": this.ite.getDateTour().ev['monthEnd'],
      "CityDestinationId": this.ite.getObjectLocation().Id,
      "RegionDestinationId": this.ite.getObjectLocation().Region.Id,
      "Attractions": this.attraction,
      "Transportations": this.transportation,
      "Accommodations": this.accomodation
    };
    console.log(JSON.stringify(json));
    let token = this.auth.AuthToken;
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TourTransactions/CreateTour';
    var response = this.http.post(url, json, options).map(res => res.json());
    this.ite.delLocalStorage();
    this.destroyObject();
    this.ds.destroyObject();
    this.ds.destroyTransport();
    return response;
  }


  getConfirmTour(id, status) {

    var json = {
      "Id": id,
      "Confirmation": status,
    };

    let token = this.auth.AuthToken;
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TourTransactions/Confirmation';
    var response = this.http.post(url, json, options).map(res => res).subscribe(res => res.status);
    return response;
  }

}
