import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IteneraryService } from '../providers/itenerary-service'


export class TransportAirport {
  transportation;
  transportservice;
  location;
  date;
  constructor() {
    window.console.log("Making a DailyProgram.");
    this.transportation = null;
    this.transportservice = null;
    this.location = null;
    this.date = null;
  }
}

export class DailyProgram {
  datetour;
  program_daily: Array<any>;

  constructor() {
    window.console.log("Making a DailyProgram.");
    this.datetour = null;
    this.program_daily = [];
  }

}

export class DailyDetailsProgram {
  id;
  location;
  destinationFrom;
  destinationTo;
  acomodation;
  roomtype;
  roomservice;
  roomallocate;
  transportation;
  hourstrans;
  transportservice;
  attraction: any = {};
  constructor() {
    this.id = null;
    this.location = null;
    this.destinationFrom = null;
    this.destinationTo = null;
    this.acomodation = null;
    this.roomtype = null;
    this.roomservice = null;
    this.roomallocate = null;
    this.transportation = null;
    this.transportservice = null;
    this.hourstrans = null;
    this.attraction = {};
  }
}

@Injectable()
export class DailyService {
  daily: any = {};
  id;
  transairport: any = {};
  constructor(public http: Http, public ite: IteneraryService) {
    console.log('Hello DailyService Provider');

  }

  destroyDailyTour() {
    this.daily = {}
  }
  destroyTransport() {
    this.transairport = {}
  }

  dailyProgram(days) {
    if (days != (Object.keys(this.daily).length) - 1) {
      this.destroyDailyTour();
      let today = new Date(this.ite.getDateTour().ev['monthStart'].replace(/-/, '/').replace(/-/, '/'))
      let tomorrow = new Date(this.ite.getDateTour().ev['monthStart'].replace(/-/, '/').replace(/-/, '/'))
      for (let i = 0; i <= days; i++) {       
        let dateDaily = tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate()
        let p = new DailyProgram()
        p.datetour = dateDaily
        p.program_daily = Array.of(this.dailyDetails(i, days))
        this.daily[i] = p
        tomorrow.setDate(tomorrow.getDate() + 1)
      }
    }
    console.log(this.daily);
  }

  dailyDetails1(i, days) {

    let d = new DailyDetailsProgram();
    let location = this.ite.getObjectLocation();

    let roomtype = this.ite.getRoomType()
    let roomservice = this.ite.getRoomSer()
    let roomallocate = this.ite.getRoomAllo()
    let transportation = this.ite.getTransport()
    let transportservice = this.ite.getTransportSer()
    let attraction = this.ite.getAttraction()


    if (roomtype != null) roomtype = this.ite.getRoomType().itemroom
    if (roomservice != null) roomservice = this.ite.getRoomSer().itemser
    if (roomallocate != null) roomallocate = this.ite.getRoomAllo().allocroom
    if (transportation != null) transportation = this.ite.getTransport().trans
    if (transportservice != null) transportservice = this.ite.getTransportSer().itemser
    if (attraction != null) attraction = this.ite.getAttraction().attrac
    d.id = 1
    d.location = location
    d.roomtype = roomtype
    d.roomservice = roomservice
    d.roomallocate = roomallocate
    d.transportation = transportation
    d.transportservice = transportservice
    d.attraction = attraction
    //agar hari terkahir tidak ada hotel
    if (i != days) {
      let acomodation = this.ite.getAcomodation()
      if (acomodation != null) acomodation = this.ite.getAcomodation().hot
      d.acomodation = acomodation
    }
    let program = d
    return program
  }

  dailyDetails(i, days) {

    let d = new DailyDetailsProgram();
    let location = this.ite.getObjectLocation();

    d.id = 1
    d.location = location
    d.destinationFrom = location;
    d.destinationTo = location;
    d.roomtype = null
    d.roomservice = null
    d.roomallocate = null
    d.transportation = null
    d.transportservice = null
    d.attraction = null
    d.hourstrans = null
    d.acomodation = null
    let program = d
    return program
  }

  addDailyDetails(i) {
    let program = this.daily[i].program_daily;
    let no = Object.keys(program).length;
    let dP = new DailyDetailsProgram;
    dP.id = no + 1
    dP.location = null
    dP.acomodation = null
    dP.roomtype = null
    dP.roomservice = null
    dP.roomallocate = null
    dP.transportation = null
    dP.hourstrans = null
    dP.transportservice = null
    dP.attraction = null
    this.daily[i].program_daily.push(dP);

  }

  public setID(id) {
    this.id = id
  }

  public getID() {
    return this.id
  }

  public setTransportAirport(service) {
    if (service == 'PickAndDrop') {
      for (let i = 0; i < 2; i++) {
        let tra = new TransportAirport();
        tra.transportation = null;
        tra.location = null;
        if (i == 0) { tra.transportservice = "PickUp"; tra.date = this.ite.getDateTour().ev['monthStart'] }
        if (i == 1) { tra.transportservice = "DropOff"; tra.date = this.ite.getDateTour().ev['monthEnd'] }
        this.transairport[i] = tra;
      }
    } else {
      let tra = new TransportAirport();
      tra.location = null;
      tra.transportation = null;
      tra.transportservice = service;
      if (service == "PickUp") tra.date = this.ite.getDateTour().ev['monthStart'];
      else tra.date = this.ite.getDateTour().ev['monthEnd'];

      this.transairport[0] = tra;
    }

    console.log(this.transairport);
  }


  public setLocationTransport(loc) {
    this.transairport[this.getID()].location = loc;
  }

  public setTransportationAirport(tra) {
    this.transairport[this.getID()].transportation = tra;
  }

  getDetails(i) {
    return this.daily[i].program_daily;
  }

  setLocation(id, i, data) {
    this.daily[id].program_daily[i].location = data
    this.daily[id].program_daily[i].destinationFrom = data
    this.daily[id].program_daily[i].destinationTo = data
    this.daily[id].program_daily[i].acomodation = null
    this.daily[id].program_daily[i].transportation = null
    this.daily[id].program_daily[i].attraction = null
    this.daily[id].program_daily[i].transportservice = null
  }

  // setAcomodation(id, i, data) {
  //   var no = Object.keys(this.daily).length;
  //   this.daily[id].program_daily[i].acomodation = data
  //   for (let j = id + 1; j < no - 1; j++) {
  //     for (let k = 0; k < Object.keys(this.daily[j].program_daily).length; k++) { 
  //       this.daily[j].program_daily[k].acomodation = null 
  //     }
  //   }

  //   for (let j = id + 1; j < no; j++) {
  //     this.daily[j].program_daily[0].location = this.daily[id].program_daily[i].location;
  //     if (j != no-1) this.daily[j].program_daily[0].acomodation = data
  //   }

  // }

  // setRoomType(id, i, data) {
  //   var no = Object.keys(this.daily).length;
  //   this.daily[id].program_daily[i].roomtype = data
  //   for (let i = id + 1; i < no - 1; i++) {
  //     this.daily[i].program_daily[0].roomtype = data
  //   }
  // }

  // setRoomService(id, i, data) {
  //   var no = Object.keys(this.daily).length;
  //   this.daily[id].program_daily[i].roomservice = data
  //   for (let i = id + 1; i < no - 1; i++) {
  //     this.daily[i].program_daily[0].roomservice = data
  //   }
  // }

  setHotel(id, i, itemser, itemroom, hotel) {
    let no = Object.keys(this.daily[id].program_daily).length;
    for (let j = 0; j < no; j++) {
      this.daily[id].program_daily[j].acomodation = null;
      this.daily[id].program_daily[j].roomtype = null;
      this.daily[id].program_daily[j].roomservice = null;
    }

    this.daily[id].program_daily[i].roomservice = itemser
    this.daily[id].program_daily[i].roomtype = itemroom
    this.daily[id].program_daily[i].acomodation = hotel


    let today = (+new Date(this.daily[id].datetour));
    let before = (+new Date(itemroom.StayingPeriodTo));
    let sum = Math.round((before - today) / 86400000)
    let endTour = new Date(this.ite.getDateTour().ev['monthEnd'].replace(/-/, '/').replace(/-/, '/'))
    let endPeriode = new Date(itemroom.StayingPeriodTo)
    var no1 = Object.keys(this.daily).length;

    if (itemroom.IsPromo) {
      if (endTour > endPeriode) {
        if (sum > no1)
          for (let k = id + 1; k < no1; k++) {
            let no = Object.keys(this.daily[k].program_daily).length;
            for (let j = 0; j < no; j++) {
              this.daily[k].program_daily[j].acomodation = null;
              this.daily[k].program_daily[j].roomtype = null;
              this.daily[k].program_daily[j].roomservice = null;
            }
            this.daily[k].program_daily[0].location = this.daily[id].program_daily[i].location;
            if (k < no1 - 1) {
              this.daily[k].program_daily[0].roomtype = itemroom
              this.daily[k].program_daily[0].roomservice = itemser
              this.daily[k].program_daily[0].acomodation = hotel
            }
          }

        else
          for (let k = id + 1; k < sum + 1; k++) {
            let no = Object.keys(this.daily[k].program_daily).length;
            for (let j = 0; j < no; j++) {
              this.daily[k].program_daily[j].acomodation = null;
              this.daily[k].program_daily[j].roomtype = null;
              this.daily[k].program_daily[j].roomservice = null;
            }
            this.daily[k].program_daily[0].location = this.daily[id].program_daily[i].location;
            if (k < sum + 1) {
              this.daily[k].program_daily[0].roomtype = itemroom
              this.daily[k].program_daily[0].roomservice = itemser
              this.daily[k].program_daily[0].acomodation = hotel
            }
          }
      } else {
        for (let k = id + 1; k < no1; k++) {
          let no = Object.keys(this.daily[k].program_daily).length;
          for (let j = 0; j < no; j++) {
            this.daily[k].program_daily[j].acomodation = null;
            this.daily[k].program_daily[j].roomtype = null;
            this.daily[k].program_daily[j].roomservice = null;
          }
          this.daily[k].program_daily[0].location = this.daily[id].program_daily[i].location;
          if (k < no1 - 1) {
            this.daily[k].program_daily[0].roomtype = itemroom
            this.daily[k].program_daily[0].roomservice = itemser
            this.daily[k].program_daily[0].acomodation = hotel
          }
        }
      }

    } else {
      for (let k = id + 1; k < no1; k++) {
        let no = Object.keys(this.daily[k].program_daily).length;
        for (let j = 0; j < no; j++) {
          this.daily[k].program_daily[j].acomodation = null;
          this.daily[k].program_daily[j].roomtype = null;
          this.daily[k].program_daily[j].roomservice = null;
        }
        this.daily[k].program_daily[0].location = this.daily[id].program_daily[i].location;
        if (k < no1 - 1) {
          this.daily[k].program_daily[0].roomtype = itemroom
          this.daily[k].program_daily[0].roomservice = itemser
          this.daily[k].program_daily[0].acomodation = hotel
        }
      }
    }
    // this.setRoomService(id,i,itemser);
    // this.setRoomType(id, i, itemroom); 
    // this.setAcomodation(id, i, hotel);
  }

  setRoomAllocate(id, i, data) {
    this.daily[id].program_daily[i].roomallocate = data
  }

  setTransportation(id, i, data) {
    this.daily[id].program_daily[i].transportation = data
  }

  setTransportService(id, i, data) {
    this.daily[id].program_daily[i].transportservice = data
    console.log(this.daily)
  }

  setHourTransport(id, i, data) {
    this.daily[id].program_daily[i].hourstrans = data
    console.log(this.daily)
  }

  setAttraction(id, i, data) {
    this.daily[id].program_daily[i].attraction = data
    console.log(this.daily[id])
  }

  getAttraction(id, i) {
    return this.daily[id].program_daily[i].attraction
  }

  public setDestinationFrom(id, i, data) {
    this.daily[id].program_daily[i].destinationFrom = (data);
  }

  public setDestinationTo(id, i, data) {
    this.daily[id].program_daily[i].destinationTo = (data);
  }


  deleteDetails(id, i) {
    const foundAt = this.daily[id].program_daily.indexOf(this.daily[id].program_daily[i]);
    if (foundAt >= 0) {
      this.daily[id].program_daily.splice(foundAt, 1);
    } else {
      this.daily[id].program_daily.push(this.daily[id].program_daily[i]);
    }
    console.log(this.daily[id].program_daily);

  }

}
