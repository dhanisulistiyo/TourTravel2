import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HotelRoomallocatePage} from '../hotel-roomallocate/hotel-roomallocate';
import {IteneraryService} from '../../providers/itenerary-service';
import {AcomodationService} from '../../providers/acomodation-service';

@Component({
  selector: 'page-hotel-roomservice',
  templateUrl: 'hotel-roomservice.html',
  providers: [IteneraryService]
})
export class HotelRoomservicePage {
   roomtypes:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ite : IteneraryService, public aco: AcomodationService) {}

  ionViewWillEnter() {
      let id = this.ite.getRoomType();
      this.roomtypes=id.itemroom['AccommodationItemServiceTypes'];
      console.log(this.roomtypes);
  }

  setSelectedRoomSer(itemser) {
     console.log(itemser);
     var data = JSON.stringify({itemser});
     console.log(data);
     this.ite.setRoomSer(data);
     this.navCtrl.push(HotelRoomallocatePage);
  }


}
