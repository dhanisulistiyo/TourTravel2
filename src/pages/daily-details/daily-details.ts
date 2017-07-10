
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { DailyDetailsProgram } from '../../providers/daily-service';
import { DailyService } from '../../providers/daily-service';
import { DestinationPage2 } from '../daily-page/destination2/destination2';
//import {ListAttractionPage1  } from '../daily-page/list-attraction1/list-attraction1';
import {FilterTransport1Page  } from '../daily-page/filter-transport1/filter-transport1';
import { FilterAttraction } from '../daily-page/filter-attraction/filter-attraction';
import { FilterHotel1Page  } from '../daily-page/filter-hotel1/filter-hotel1';

@IonicPage()
@Component({
  selector: 'page-daily-details',
  templateUrl: 'daily-details.html'
})


export class DailyDetails {
  selectedItem: any;
  idAwal;
  tanggal;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ds: DailyService) {
    this.selectedItem = navParams.get('item');
    this.idAwal = navParams.get('awal');
    this.tanggal = navParams.get('date');
    console.log(this.selectedItem);
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
    if (this.selectedItem[i].location!=null){
    console.log(i);
    let des = this.selectedItem[i].location.Id
    console.log(des)
    let id = this.idAwal
    this.navCtrl.push(FilterAttraction, { des, id, i })
    }
  }

  transportationTapped(i) {
    if (this.selectedItem[i].location!=null){
    // let des = this.selectedItem[i].location[0].Id
    // console.log(des)
    let id = this.idAwal
    this.navCtrl.push(FilterTransport1Page, {id, i })
    }
  }

  acomodationTapped(i) {
if (this.selectedItem[i].location!=null){
    let des = this.selectedItem[i].location.Id
    let id = this.idAwal
    let no = Object.keys(this.ds.daily).length;
    if(id != no-1) this.navCtrl.push(FilterHotel1Page, { des, id, i })
}
  }


  AddCard(event) {
    this.ds.addDailyDetails(this.idAwal)
  }



}
