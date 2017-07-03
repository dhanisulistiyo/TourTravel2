import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { IteneraryService } from '../../providers/itenerary-service';
import { DailyService } from '../../providers/daily-service';
import { DestinationPage1 } from '../destination1/destination1';
//import { FilterTransport2Page } from '../filter-transport2/filter-transport2';
//import { FilterHotel2Page } from '../filter-hotel2/filter-hotel2';
import { TransportAirportservicePage  } from '../transport-airportservice/transport-airportservice';
import { HotelRoomallocatePage } from '../hotel-roomallocate/hotel-roomallocate';
import { ListAttractionPage } from '../list-attraction/list-attraction';
import { InputTravellersPage } from '../input-travellers/input-travellers';
import { DailyProgram} from '../daily-program/daily-program';

@Component({
  selector: 'page-itenerary-builder',
  templateUrl: 'itenerary-builder.html',
  providers: [IteneraryService]
})
export class IteneraryBuilderPage {
  toursname: string;
  destination: string;
  attraction: string;
  passenger: string;
  tranportation: string;
  acomodation: string;
  totalDays;
  allocation:string;
  public event = {
    monthStart: '',
    monthEnd: ''
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private ite: IteneraryService,
    public ds: DailyService,
    public alertCtrl: AlertController
  ) {
    this.toursname = '';
    this.destination = this.ite.getDestination();
    this.passenger = '';
    this.attraction = '';
    this.tranportation = '';
    this.acomodation = '';
    this.allocation = '';
    this.event = {
      monthStart: new Date().toISOString().substring(0, 10),
      monthEnd: new Date().toISOString().substring(0, 10)
    };

  }

  ionViewWillEnter() {
    var des = this.ite.getDestination();
    var att = this.ite.getAttraction();
    var tourName = this.ite.getToursName();
    //var transportName = this.ite.getTransport();
    var t = this.ds.transairport
    var airportTransport = Object.keys(t).length;
    var acomodationName = this.ite.getAcomodation();
    var passengerTotal = this.ite.getPassenger();
    var dateTours = this.ite.getDateTour();
    var alloc = this.ite.getRoomAllo();
    if (des != null) {

      this.destination = des;
    }

    if (att != null) {
        //let n = att.attrac.length;
        this.attraction = att.attrac
    }
    if (tourName != null) {
      this.toursname = tourName;
    }
    // if (transportName != null) {
    //   if(this.ite.getTransportSer()==null) this.tranportation = transportName.trans.Name;
    //   else this.tranportation = transportName.trans.Name+', '+transportName.trans.TransportationSeatTypeName+' Seater, ' +this.ite.getTransportSer().itemser;
    if (airportTransport != 0) {
      if(airportTransport == 1) {
        if(t["0"].transportation != null) this.tranportation = +t["0"].transportation.TransportationSeatTypeName+' Seater '+ t["0"].transportation.Name+' , '+t["0"].transportservice;
      }
      else  if(t["0"].transportation != null) this.tranportation =  +t["0"].transportation.TransportationSeatTypeName+' Seater '+ t["0"].transportation.Name+' , '+t["0"].transportservice+' ; ' +t["1"].transportation.TransportationSeatTypeName+' Seater '+ t["1"].transportation.Name+' , '+t["1"].transportservice;
    }
    if (acomodationName != null) {
      if(this.ite.getRoomSer()==null) this.acomodation = acomodationName.hot.Name;
      else this.acomodation = acomodationName.hot.Name+', '+this.ite.getRoomType().itemroom.AccommodationItemTypeName+', '+this.ite.getRoomSer().itemser;
    }
    if (passengerTotal != null) {
      var adult = passengerTotal.guestTour['AdultQty'];
      var child = passengerTotal.guestTour['ChildQty'];
      var infant = passengerTotal.guestTour['InfantQty'];
      if (adult != 0 && child != 0 && infant != 0) {
        this.passenger = +adult + ' Adults, ' + child + ' Childs, ' + infant + ' Infant ';
      } else if (adult != 0 && child != 0 && infant == 0) {
        this.passenger = +adult + ' Adults, ' + child + ' Childs';
      } else if (adult != 0 && child == 0 && infant != 0) {
        this.passenger = +adult + ' Adults, ' + infant + ' Infant ';
      } else if (adult == 0 && child != 0 && infant != 0) {
        this.passenger = +child + ' Childs, ' + infant + ' Infant ';
      } else if (adult != 0 && child == 0 && infant == 0) {
        this.passenger = +adult + ' Adults';
      } else if (adult == 0 && child != 0 && infant == 0) {
        this.passenger = +child + ' Childs';
      } else if (adult == 0 && child == 0 && infant != 0) {
        this.passenger = +infant + ' Infant ';
      }else if (adult == 0 && child == 0 && infant == 0) {
        this.passenger ='';
    }
    if (dateTours != null) {
      this.event = dateTours.ev;
    }

    if (alloc != null){
      var sharingRooms = Number(alloc.allocroom.sharingRooms);
      var singleRoom = Number(alloc.allocroom.singleRoom)
      var extraBed = Number(alloc.allocroom.extraBed)
      var sharingBed = Number(alloc.allocroom.sharingBed)

      if (sharingRooms != 0 && singleRoom != 0 && extraBed != 0 && sharingBed != 0  ) {
        this.allocation =  +sharingRooms + ' Twin Room, ' + singleRoom + ' Single Room, ' + extraBed + ' Extra Bed, ' + sharingBed + ' Sharing Bed With Parents';
      } else if (sharingRooms != 0 && singleRoom == 0 && extraBed == 0 && sharingBed == 0) {
         this.allocation =  +sharingRooms + ' Twin Room';
      } else if (sharingRooms == 0 && singleRoom != 0 && extraBed == 0 && sharingBed == 0) {
         this.allocation =  + singleRoom + ' Single Room';
      } else if (sharingRooms == 0 && singleRoom == 0 && extraBed != 0 && sharingBed == 0) {
         this.allocation = + extraBed + ' Extra Bed ';
      }else if (sharingRooms == 0 && singleRoom == 0 && extraBed == 0 && sharingBed != 0) {
         this.allocation =  + sharingBed + '  Sharing Bed With Parents';


      }else if (sharingRooms != 0 && singleRoom != 0 && extraBed == 0 && sharingBed == 0) {
         this.allocation =  +sharingRooms + ' Twin Room, ' + singleRoom + ' Single Room';
      }else if (sharingRooms != 0 && singleRoom == 0 && extraBed != 0 && sharingBed == 0) {
         this.allocation =  +sharingRooms + ' Twin Room, '+ extraBed + ' Extra Bed ';
      }else if (sharingRooms != 0 && singleRoom == 0 && extraBed == 0 && sharingBed != 0) {
         this.allocation =  +sharingRooms + ' Twin Room, ' + sharingBed + ' Sharing Bed With Parents';
     
    
     }else if (sharingRooms == 0 && singleRoom != 0 && extraBed != 0 && sharingBed == 0) {
         this.allocation = + singleRoom + ' Single Room, ' + extraBed + ' Extra Bed ' ;
      }else if (sharingRooms == 0 && singleRoom != 0 && extraBed == 0 && sharingBed != 0) {
         this.allocation = + singleRoom + ' Single Room, '+ sharingBed + ' Sharing Bed With Parents';
      }else if (sharingRooms == 0 && singleRoom == 0 && extraBed != 0 && sharingBed != 0) {
         this.allocation =  + extraBed + ' Extra Bed, ' + sharingBed + ' Sharing Bed With Parents';
      
    
      }else if (sharingRooms != 0 && singleRoom != 0 && extraBed != 0 && sharingBed == 0) {
         this.allocation =  +sharingRooms + ' Twin Room, ' + singleRoom + ' Single Room, ' + extraBed + ' Extra Bed ' ;
      }else if (sharingRooms != 0 && singleRoom != 0 && extraBed == 0 && sharingBed != 0) {
         this.allocation =  +sharingRooms + ' Twin Room, ' + singleRoom + ' Single Room, ' + sharingBed + ' Sharing Bed With Parents ';
      }else if (sharingRooms != 0 && singleRoom == 0 && extraBed != 0 && sharingBed != 0) {
         this.allocation =  +sharingRooms + ' Twin Room, ' + extraBed + ' Extra Bed, ' + sharingBed + ' Sharing Bed With Parents ';
      }else if (sharingRooms == 0 && singleRoom != 0 && extraBed != 0 && sharingBed != 0) {
         this.allocation =  + singleRoom + ' Single Room, ' + extraBed + ' Extra Bed, ' + sharingBed + ' Sharing Bed With Parents ';
      }else if (sharingRooms == 0 && singleRoom == 0 && extraBed == 0 && sharingBed == 0) {
         this.allocation =  '';
      }

    }
    }  
  }


  inputToursName(event) {
    var data = event.target.value;
    console.log(this.toursname);
    this.ite.setToursName(data);
  }

  inputDateTours(ev) {
    let today =new Date(ev['monthStart'])
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1)
    console.log(tomorrow.toISOString().substring(0, 10));
    //hitung total days
    let start =(+new Date(ev['monthStart']))
    let end = (+new Date(ev['monthEnd']))
    this.totalDays= (end-start)/86400000;
    console.log(this.totalDays);
    //kirim data ke itenerary service
    var data = JSON.stringify({ ev });
    console.log(data);
    this.ite.setDateTour(data);
  }

  destinationTapped(event) {
    this.navCtrl.push(DestinationPage1);
  }

  passengerTapped(event) {
    this.navCtrl.push(InputTravellersPage);
  }

  hotelTapped(event) {
    if (this.passenger == '') this.showAlertGuest();
    else this.navCtrl.push(HotelRoomallocatePage);
  }
  transportTapped(event) {
    if (this.destination == '') this.showAlertDestination();
    else this.navCtrl.push(TransportAirportservicePage);
  }

  attractionTapped(event) {
    if (this.destination == '') this.showAlertDestination();
    else this.navCtrl.push(ListAttractionPage);
  }



  createItenerary(event) {
    if (this.ite.getToursName() == null) this.showAlertTourName();
    else if (this.destination == '')this.showAlertDestination();
    else if (this.ite.getDateTour() == null) this.showAlertDates();
    else if(this.totalDays < 0) this.showAlertValidasiDates();
    else if (this.passenger == '') this.showAlertGuest();
    else {
      //this.ds.destroyObject();
      this.ds.dailyProgram(this.totalDays);
      this.navCtrl.push(DailyProgram);
    }
  }


  //alert-alert
  showAlertTourName() {
    let alert = this.alertCtrl.create({
      subTitle: 'Please Input Tours Name ',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertDestination() {
    let alert = this.alertCtrl.create({
      subTitle: 'Please Choose Your Destination ',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertDates() {
    let alert = this.alertCtrl.create({
      subTitle: 'Please Change Your Date Tour ',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertValidasiDates() {
    let alert = this.alertCtrl.create({
      subTitle: 'Please Change the end date is greater than the start date ',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertGuest() {
    let alert = this.alertCtrl.create({
      subTitle: 'Please Input Guest Tour ',
      buttons: ['OK']
    });
    alert.present();
  }




}