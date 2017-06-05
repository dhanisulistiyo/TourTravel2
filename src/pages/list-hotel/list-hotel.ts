import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {FilterHotelPage} from '../filter-hotel/filter-hotel';
import { HotelRoomtypePage } from '../hotel-roomtype/hotel-roomtype';
import { AcomodationService } from '../../providers/acomodation-service';
import { IteneraryService } from '../../providers/itenerary-service';
import { FilacomodationService } from '../../providers/filacomodation-service';
import { FilterHotel2Page } from '../filter-hotel2/filter-hotel2';

/*
  Generated class for the ListHotel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-hotel',
  templateUrl: 'list-hotel.html',
  providers: [AcomodationService, IteneraryService]
})
export class ListHotelPage {
  listhotels: Array<any>;
  hotels: Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ite: IteneraryService,
    public aco: AcomodationService,
    public fil: FilacomodationService
  ) { }

  ionViewWillEnter() {
    this.aco.searchListAcomodationFilter().subscribe(data => {
      this.listhotels = data;
      this.hotels = this.listhotels;
      console.log(this.listhotels);

    }, err => {
      console.log(err);
    },
      () => console.log('Hotel Search Complete')
    );
  }

  listHotel() {
    this.hotels = this.listhotels;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.hotels;
    // set q to the value of the searchbar
    var q = searchbar.target.value;
    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      this.listHotel();
      return;
    }

    this.hotels = this.hotels.filter((v) => {

      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })

  }


  setSelectedHotel(hot) {
    console.log(hot);
    var data = JSON.stringify({ hot });
    console.log(data);
    this.ite.setAcomodation(data);
    this.navCtrl.push(HotelRoomtypePage);
  }




  filterhotelTapped(event) {
    this.aco.delStorFilHot();
    this.navCtrl.pop();
    this.navCtrl.push(FilterHotel2Page);
  }

}
