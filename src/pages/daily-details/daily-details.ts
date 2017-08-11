import { Component, ChangeDetectorRef } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
//import { DailyDetailsProgram } from '../../providers/daily-service';
import { DailyService } from '../../providers/daily-service';
import { DestinationPage2 } from '../daily-page/destination2/destination2';
//import {ListAttractionPage1  } from '../daily-page/list-attraction1/list-attraction1';
import { FilterTransport1Page } from '../daily-page/filter-transport1/filter-transport1';
import { FilterAttraction } from '../daily-page/filter-attraction/filter-attraction';
import { FilterHotel1Page } from '../daily-page/filter-hotel1/filter-hotel1';
import { IteneraryService } from '../../providers/itenerary-service';

@Component({
  selector: 'page-daily-details',
  templateUrl: 'daily-details.html'
})


export class DailyDetails {
  selectedItem: any;
  idAwal;
  tanggal;
  toursname;
  guest;
  event;
  location;
  showToolbar: boolean = false;
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, 
    public navParams: NavParams, public ds: DailyService, public it: IteneraryService, public alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item');
    this.idAwal = navParams.get('awal');
    this.tanggal = navParams.get('date');
    var pt = this.it.getPassenger();
    this.toursname = this.it.getToursName();
    this.guest = Number(pt.guestTour['AdultQty']) + Number(pt.guestTour['ChildQty']) + Number(pt.guestTour['InfantQty']);
    this.event = this.it.getDateTour().ev;
    this.location = this.it.getObjectLocation();
    console.log(this.selectedItem);
  }
  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewWillEnter() {
    this.selectedItem = this.ds.getDetails(this.idAwal);
  }

  doneTap(event) {
    this.navCtrl.pop();
  }

  destinatinTapped(i) {
    console.log(i);
    let id = this.idAwal
    this.navCtrl.push(DestinationPage2, { id, i })
  }

  attractionTapped(i) {
    if (this.selectedItem[i].location != null) {
      console.log(i);
      let des = this.selectedItem[i].location.Id
      console.log(des)
      let id = this.idAwal
      this.navCtrl.push(FilterAttraction, { des, id, i })
    }
  }

  transportationTapped(i) {
    if (this.selectedItem[i].location != null) {
      // let des = this.selectedItem[i].location[0].Id
      // console.log(des)
      let id = this.idAwal
      this.navCtrl.push(FilterTransport1Page, { id, i })
    }
  }

  acomodationTapped(i) {
    if (this.selectedItem[i].location != null) {
      let tgl = this.tanggal;
      let des = this.selectedItem[i].location.Id
      let id = this.idAwal
      let no = Object.keys(this.ds.daily).length;
      if (id != no - 1) this.navCtrl.push(FilterHotel1Page, { des, id, i, tgl })
    }
  }


  AddCard(event) {
    this.ds.addDailyDetails(this.idAwal)
  }

  deleteCard(i) {
    let id = this.idAwal
    let prompt = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: "Do you want delete this destinantion?",
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
            this.ds.deleteDetails(id, i);
          }
        }
      ]
    });
    prompt.present();
  }


}
