import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HotelRoomservicePage} from '../hotel-roomservice/hotel-roomservice';
import {AcomodationService} from '../../providers/acomodation-service';
import {IteneraryService} from '../../providers/itenerary-service';

@Component({
  selector: 'page-hotel-roomtype',
  templateUrl: 'hotel-roomtype.html',
  providers: [AcomodationService,IteneraryService]
})
export class HotelRoomtypePage {

  listroomtypes:Array<any>;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public ite : IteneraryService,
  public aco : AcomodationService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelRoomtypePage');
  }

    ionViewWillEnter() {
    this.aco.searchListItemAcomodation().subscribe(data=>{
                this.listroomtypes=data;
                console.log(this.listroomtypes);
            },err => {
                    console.log(err);
                },
                () => console.log('Room Type Search Complete')
            );
  }

  setSelectedRoomAllo(itemroom) {
     console.log(itemroom);
     var data = JSON.stringify({itemroom});
     console.log(data);
     this.ite.setRoomType(data);
     this.navCtrl.push(HotelRoomservicePage);
  }
  
}
