import { ReadyPackageProvider } from './ready-package';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Attractions {
  Name
  ServiceItemId
  DateTime
  Duration
  CityId

  constructor() {
   this.Name = null
   this.ServiceItemId = null;
   this.DateTime = null
   this.Duration = null
   this.CityId = null
  }
}

export class Transportations {
  Name
  ServiceItemId
  TransportationItemServiceType
  DateTime
  CityId
  Hours

  constructor() {
    this.Name = null;
    this.ServiceItemId = null
    this.TransportationItemServiceType = null
    this.DateTime = null
    this.CityId = null
    this.Hours = null
  }
}

export class Accommodations {
  Name
  RoomType
  ServicesName
  RoomId
  DateTime
  RoomAllocation

  constructor() {
    this.Name = null
    this.RoomType = null
    this.ServicesName = null
    this.RoomId = null
    this.DateTime = null
    this.RoomAllocation = null
  }
}

export class ReadyDP {
  datetour;
  program_daily: Array<any>;

  constructor() {
    this.datetour = null;
    this.program_daily = [];
  }
}

export class DailyDetailsProgram {
  location;
  destinationFrom;
  destinationTo;
  acomodation;
  transportation;
  attraction: any = {};
  constructor() {
    this.location = null;
    this.destinationFrom = null;
    this.destinationTo = null;
    this.acomodation = null;
    this.transportation = null;
    this.attraction = null;
  }
}
/*
  Generated class for the IteneraryReadyProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IteneraryReadyProvider {
    //versi 2
    destinantion
    startdate;
    tourtype;
    grouptype;
    passenger;
    roomallocate;
    BookingDetailSum;
    DailyPrograms;
  constructor(public http: Http, public ready : ReadyPackageProvider) {
    console.log('Hello IteneraryReadyProvider Provider');
  }
  public setDestination(ty){
    this.destinantion = ty;
  }
  public getDestination(){
    return this.destinantion;
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
  public getDateTour() {
    return this.startdate;
  }
  public setPassenger(ty){
    this.passenger = ty;
  }
  public getPassenger(){
    return this.passenger
  }

  public setRoomAllo(ty){
    this.roomallocate = ty;
  }
  public getRoomAllo(){
    return this.roomallocate
  }

  public getDetailsTour(id){
    this.ready.detailsPackage(id).subscribe(data => {
      this.BookingDetailSum = (data['BookingDetailSum'])
      this.DailyPrograms = (data['DailyPrograms'])
    }, err => {
      console.log(err);
    },
      () => console.log('Fixed Search Complete')
    );
  }

}
