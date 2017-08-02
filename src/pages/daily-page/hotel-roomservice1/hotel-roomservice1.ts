import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//import {HotelRoomallocatePage1} from '../hotel-roomallocate1/hotel-roomallocate1';
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
  itemroom;
  hotel;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ds : DailyService, 
  public aco: AcomodationService,
  private viewCtrl: ViewController,
  ) {
    this.itemroom = navParams.data['itemroom']
    this.hotel = navParams.data['hotel']
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
     this.ds.setHotel(id,i,itemser,this.itemroom, this.hotel);
     //this.navCtrl.push(HotelRoomallocatePage1,{id,i});
      this.navCtrl.pop().then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
        this.navCtrl.remove(index - 1);
      });
  }



}
