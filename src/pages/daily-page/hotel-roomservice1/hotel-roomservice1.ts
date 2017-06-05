import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HotelRoomallocatePage1} from '../hotel-roomallocate1/hotel-roomallocate1';
import {AcomodationService} from '../../../providers/acomodation-service';
import {DailyService} from '../../../providers/daily-service';

@Component({
  selector: 'page-hotel-roomservice1',
  templateUrl: 'hotel-roomservice1.html'
})
export class HotelRoomservicePage1 {
   roomtypes:Array<any>;
  idAwal;
  idAkhir;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ds : DailyService, public aco: AcomodationService) {
    this.roomtypes=navParams.data['type']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }

  ionViewWillEnter() {
      console.log(this.roomtypes);
  }

  setSelectedRoomSer(itemser) {
     console.log(itemser);
    let id = this.idAwal;
     let i = this.idAkhir;
     this.ds.setRoomService(id,i,itemser);
     this.navCtrl.push(HotelRoomallocatePage1,{id,i});
  }



}
