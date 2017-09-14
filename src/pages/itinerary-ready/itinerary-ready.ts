import { GuestServiceProvider } from './../../providers/guest-service';
import { GuestDetailsPage } from './../guest-details/guest-details';
import { IteneraryReadyProvider } from './../../providers/itenerary-ready';
import { HotelRoomallocatePage } from './../hotel-roomallocate/hotel-roomallocate';
import { InputTravellersPage } from './../input-travellers/input-travellers';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-itinerary-ready',
  templateUrl: 'itinerary-ready.html',
})
export class ItineraryReadyPage {
  typeGuest
  kuotaGuest
  kuotaG
  type
  typeG
  maxGuest
  datefrom: Date = new Date();
  startDate
  passenger: string;
  allocation: Array<{ guest: number, name: string }>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public itr: IteneraryReadyProvider, public gu :  GuestServiceProvider
  ) {
    this.kuotaGuest = ['Choose Guest Capacity', 'Small Group (Up to 10 person)', 'Large Group (More than 10 person)']
    this.typeGuest = ['Choose Type'];
    this.kuotaG = null;
    this.typeG = null;
    this.maxGuest = 0;
    this.passenger = '';
    this.allocation = [];
  }

  ionViewWillEnter() {

    var passengerTotal = this.itr.getPassenger();
    var dateTours = this.itr.getDateTour();
    var alloc = this.itr.getRoomAllo();

    if (passengerTotal != null) {
      var adult = passengerTotal.AdultQty;
      var child = passengerTotal.ChildQty;
      var infant = passengerTotal.InfantQty;
      if (adult != 0 && child != 0 && infant != 0) {
        this.passenger = +adult + ' Adult(s), ' + child + ' Child(s), ' + infant + ' Infant(s) ';
      } else if (adult != 0 && child != 0 && infant == 0) {
        this.passenger = +adult + ' Adult(s), ' + child + ' Child(s)';
      } else if (adult != 0 && child == 0 && infant != 0) {
        this.passenger = +adult + ' Adult(s), ' + infant + ' Infant(s) ';
      } else if (adult == 0 && child != 0 && infant != 0) {
        this.passenger = +child + ' Child(s), ' + infant + ' Infant(s) ';
      } else if (adult != 0 && child == 0 && infant == 0) {
        this.passenger = +adult + ' Adult(s)';
      } else if (adult == 0 && child != 0 && infant == 0) {
        this.passenger = +child + ' Child(s)';
      } else if (adult == 0 && child == 0 && infant != 0) {
        this.passenger = +infant + ' Infant(s) ';
      } else if (adult == 0 && child == 0 && infant == 0) {
        this.passenger = '';
      }

      if (dateTours != null) {
        this.datefrom = dateTours;
      }

      if (alloc != null) {
        console.log(alloc)
        this.allocation = [];
        var SR = Number(alloc.sharingRooms);
        var SiR = Number(alloc.singleRoom)
        var EB = Number(alloc.extraBed)
        var EC = Number(alloc.extraBedChild)
        var SB = Number(alloc.sharingBed)
        var BC = Number(alloc.babyCrib)
        var NB = Number(alloc.noBed)

        if (SR != 0) this.allocation.push({ guest: SR, name: "Sharing Room" })
        if (SiR != 0) this.allocation.push({ guest: SiR, name: "Single Room" })
        if (EB != 0) this.allocation.push({ guest: EB, name: "Extra Bed Adult" })
        if (EC != 0) this.allocation.push({ guest: EC, name: "Extra Bed Child" })
        if (SB != 0) this.allocation.push({ guest: SB, name: "Sharing Bed" })
        if (BC != 0) this.allocation.push({ guest: BC, name: "Baby Crib" })
        if (NB != 0) this.allocation.push({ guest: NB, name: "No Bed" })

        console.log(this.allocation);
      }
    }
  }

  setKuotaGuest(kuo) {
    console.log(kuo.substr(0, 11));
    this.kuotaG = kuo.substr(0, 11);
    if (kuo.substr(0, 11) == 'Small Group') {
      this.type = 'Choose Type'
      this.typeG = null;
      this.typeGuest = ['Choose Type', 'Regular', 'Family', 'Business', 'Honeymoon']
      this.itr.setGroupType("Small");
      console.log(this.itr.getGroupType())
    } else {
      this.type = 'Choose Type'
      this.typeG = null;
      this.typeGuest = ['Choose Type', 'Regular', 'Family', 'Business'];
      this.itr.setGroupType("Large");
      console.log(this.itr.getGroupType())
    }
  }

  setTypeGuest(type) {
    this.typeG = type;
    this.itr.setTourType(type);
    if (this.kuotaG == 'Small Group') {
      if (type == 'Regular') this.maxGuest = 10;
      else if (type == 'Family') this.maxGuest = 10;
      else if (type == 'Business') this.maxGuest = 10;
      else if (type == 'Honeymoon') this.maxGuest = 2;
    } else {
      if (type == 'Regular') this.maxGuest = 1000;
      else if (type == 'Family') this.maxGuest = 1000;
      else if (type == 'Business') this.maxGuest = 1000;
    }
    console.log(this.itr.getTourType())

  }

  setDateFrom(date: Date) {
    console.log(this.startDate);
    this.datefrom = (date);
    let tgl = this.datefrom;
    this.startDate = tgl.getFullYear() + "-" + (tgl.getMonth() + 1) + "-" + tgl.getDate()
    this.itr.setDateTour(this.startDate);
  }

  passengerTapped(event) {
    let count = this.maxGuest;
    let kuota = this.kuotaG;
    let type = "READY";
    if (this.typeG != null) this.navCtrl.push(InputTravellersPage, { count, kuota, type });
    else this.showAlertTravelType();
  }

  hotelTapped(event) {
    let type = "READY";
    if (this.passenger == '') this.showAlertGuest();
    else this.navCtrl.push(HotelRoomallocatePage, { type });
  }

  createItenerary(event) {
    if(this.itr.getDateTour() != null){
    var today = new Date()
    var dateFrom = new Date(this.startDate)
    }

    if(this.passenger != ''){
    var adult = this.itr.getPassenger().AdultQty;
    var child = this.itr.getPassenger().ChildQty;
    var infant = this.itr.getPassenger().InfantQty;
    } 

    var alloc = this.itr.getRoomAllo()

    if (this.kuotaG == null) this.showAlertGuestType();
    else if (this.typeG == null || this.typeG == "Choose Type") this.showAlertTravelType();
    else if (this.itr.getDateTour() == null) this.showAlertDates();
    else if (today >= dateFrom) this.showAlertToday();
    else if (this.passenger == '') this.showAlertGuest();
    else if (alloc == null) this.showAlertAllocation();
    else {
        var SR = Number(alloc.sharingRooms);
        var SiR = Number(alloc.singleRoom)
        var EB = Number(alloc.extraBed)
        var EC = Number(alloc.extraBedChild)
        var SB = Number(alloc.sharingBed)
        var BC = Number(alloc.babyCrib)
        var NB = Number(alloc.noBed)
        if((SR+SiR+EB+EC+SB+BC+NB)==(adult+child+infant))
          {
              let type = "READY";
              this.gu.createGuest(adult, child, infant, this.kuotaG)
              this.navCtrl.push(GuestDetailsPage, { type });
          }else this.showAlertAllocationVal();
    }
  }

  showAlertAllocationVal() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Allocation Guest and Total Guest not Same',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertDates() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please Change Your Date Tour ',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertToday() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Cannot choose start date is today ',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertAllocation() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please Allocation Guest',
      buttons: ['OK']
    });
    alert.present();
  }
  allertLeave() {
    let prompt = this.alertCtrl.create({
      title: 'Leave Itinerary',
      message: "Do you agree leave this itinerary and this data will not be saved ?",
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Saved clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    prompt.present();
  }

  showAlertTravelType() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please Choose Travel Type ',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertGuestType() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please Choose Guest Type ',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertGuest() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please Input Guest Tour ',
      buttons: ['OK']
    });
    alert.present();
  }
}
