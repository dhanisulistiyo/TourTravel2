import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../providers/auth-token-service';
import { IteneraryService } from '../providers/itenerary-service';
/*
  Generated class for the TransactionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TransactionService {
  attraction: Array<{ ServiceItemId: any, Date: any }>;
  transportation: Array<{ ServiceItemId: any, TransportationItemServiceType: any, Date: any }>;
  accomodation: Array<{ ServiceItemId, Date, SharingRoomQty, SingleRoomQty, ExtraBedQty, SharingBedQty, AccommodationItemServiceType }>;

  constructor(public http: Http, public auth: AuthService, public ite: IteneraryService) {
  }

  getTourPrice() {
    this.dataStorage();
    let token = this.auth.AuthToken;
    var json = {
      "title": this.ite.getToursName(),
      "AdultPaxQty": Number(this.ite.getPassenger().guestTour['AdultQty']),
      "ChildPaxQty": Number(this.ite.getPassenger().guestTour['ChildQty']),
      "InfantPaxQty": Number(this.ite.getPassenger().guestTour['InfantQty']),
      "StartDate": this.ite.getDateTour().ev['monthStart'],
      "EndDate": this.ite.getDateTour().ev['monthEnd'],
      "CityDestinationId": null,
      "RegionDestinationId": this.ite.getObjectLocation()[0].RegionId,
      "Attractions": this.attraction,
      "Transportations": this.transportation,
      "Accommodations": this.accomodation
    };

    console.log(token);
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    //headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TourTransactions/DemoPrice';
    var response = this.http.post(url, json, options).map(res => res.json());
    return response;
  }




  getTourTransaksi() {
    this.dataStorage();
    let token = this.auth.AuthToken;
    var json = {
      "title": this.ite.getToursName(),
      "AdultPaxQty": Number(this.ite.getPassenger().guestTour['AdultQty']),
      "ChildPaxQty": Number(this.ite.getPassenger().guestTour['ChildQty']),
      "InfantPaxQty": Number(this.ite.getPassenger().guestTour['InfantQty']),
      "StartDate": this.ite.getDateTour().ev['monthStart'],
      "EndDate": this.ite.getDateTour().ev['monthEnd'],
      "CityDestinationId": null,
      "RegionDestinationId": this.ite.getObjectLocation()[0].RegionId,
      "Attractions": this.attraction,
      "Transportations": this.transportation,
      "Accommodations": this.accomodation

    };


    console.log(token);
    var headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    //headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/TourTransactions/';
    var response = this.http.post(url, json, options).map(res => res.json());
    this.ite.delLocalStorage();
    return response;
  }

  

  dataStorage(){
    var att = this.ite.getAttraction();
    var trans = this.ite.getTransport();
    var acomo = this.ite.getAcomodation();
    if (att == null) this.attraction = [];
    else this.attraction = [{
      ServiceItemId: Number(this.ite.getAttraction().attrac.ServiceItemId),
      Date: this.ite.getDateTour().ev['monthStart']
    }];

    if (trans == null) this.transportation = [];
    else this.transportation = [{
      ServiceItemId: Number(this.ite.getTransport().trans.ServiceItemId),
      TransportationItemServiceType: this.ite.getTransportSer().itemser,
      Date: this.ite.getDateTour().ev['monthStart']
    }];

    if (acomo == null) this.accomodation = [];
    else this.accomodation = [{
          ServiceItemId: Number(this.ite.getRoomType().itemroom.ServiceItemId),
          Date: this.ite.getDateTour().ev['monthStart'],
          SharingRoomQty: Number(this.ite.getRoomAllo().allocroom.sharingRooms),
          SingleRoomQty: Number(this.ite.getRoomAllo().allocroom.singleRoom),
          ExtraBedQty: Number(this.ite.getRoomAllo().allocroom.extraBed),
          SharingBedQty: Number(this.ite.getRoomAllo().allocroom.sharingBed),
          AccommodationItemServiceType: this.ite.getRoomSer().itemser
    }];


  }

}
