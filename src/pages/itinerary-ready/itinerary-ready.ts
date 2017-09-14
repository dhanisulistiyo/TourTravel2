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
   public itr: IteneraryReadyProvider
  ) {
    this.kuotaGuest = ['Choose Guest Capacity', 'Small Group (Up to 10 person)', 'Large Group (More than 10 person)']
    this.typeGuest = ['Choose Type'];
    this.kuotaG = null;
    this.typeG = null;
    this.maxGuest = 0;
    this.passenger = '';
    this.allocation = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryReadyPage');
  }

  setKuotaGuest(kuo) {
    console.log(kuo.substr(0,11));
    this.kuotaG = kuo.substr(0,11);
    if (kuo.substr(0,11) == 'Small Group') {
      this.type = 'Choose Type'
      this.typeG=null;
      this.typeGuest = ['Choose Type', 'Regular', 'Family', 'Business', 'Honeymoon']
      this.itr.setGroupType("Small");
      console.log(this.itr.getGroupType())
    } else {
      this.type = 'Choose Type'
      this.typeG=null;
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



  }

  setDateFrom(date: Date) {
    console.log(this.startDate);
    this.datefrom = (date);
    let tgl = this.datefrom;
    this.startDate = tgl.getFullYear()+"-"+(tgl.getMonth()+1)+"-"+tgl.getDate()
    this.itr.setDateTour(this.startDate);
  }

  passengerTapped(event) {
    let count = this.maxGuest;
    let kuota = this.kuotaG;
    if (this.typeG != null) this.navCtrl.push(InputTravellersPage, { count, kuota });
    else this.showAlertTravelType();
  }

  hotelTapped(event) {
    if (this.passenger == '') this.showAlertGuest();
    else this.navCtrl.push(HotelRoomallocatePage);
  }

  allertLeave(){
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
