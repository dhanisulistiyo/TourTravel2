import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HotelRoomtypePage1 } from '../hotel-roomtype1/hotel-roomtype1';
import { AcomodationService } from '../../../providers/acomodation-service';
import { FilterHotel1Page } from '../filter-hotel1/filter-hotel1';
import { HotelDetailsPage } from '../hotel-details/hotel-details';
import { DailyService } from '../../../providers/daily-service';

@Component({
  selector: 'page-list-hotel1',
  templateUrl: 'list-hotel1.html',
  providers: [AcomodationService]
})
export class ListHotelPage1 {
  listhotels: Array<any>;
  hotels: Array<any>;
  idAwal;
  idAkhir;
  des;
  tgl;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public aco: AcomodationService,
    public ds: DailyService,
    public load: LoadingController
  ) {
    this.tgl = navParams.data['tgl']
    this.des = navParams.data['des']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.aco.getListAcomodationFilter(this.des).subscribe(data => {
      this.listhotels = data;
      this.hotels = this.listhotels;
      loader.dismiss();
      console.log(this.listhotels);

    }, err => {
      console.log(err);
      this.listhotels = [];
      loader.dismiss();

    },
      () => console.log('Hotel Search Complete')
    );
  }

  detailsHotel(i){
    this.navCtrl.push(HotelDetailsPage);
  }

  getNumber(n){
      return new Array(Number(n));
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
    if (q != undefined) {
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
    } else this.listHotel();
  }


  // setSelectedHotel(hot) {
  //   console.log(hot);
  //   let ser = (hot['Id']);
  //   let id = this.idAwal;
  //   let i = this.idAkhir;
  //   let no = Object.keys(this.ds.daily[id].program_daily).length;
  //   for (let j = 0; j < no; j++) {
  //     this.ds.daily[id].program_daily[j].acomodation = null;
  //   }
  //   this.ds.setAcomodation(id, i, hot)
  //   this.navCtrl.push(HotelRoomtypePage1, { id, i, ser , hot});
  // }


  //new fungtion v3
  setSelectedHotel(hot) {
    console.log(hot);
    let tgl =  this.tgl;
    let ser = (hot['Id']);
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(HotelRoomtypePage1, { id, i, ser , hot, tgl});
  }


  filterhotelTapped(event) {
    this.aco.delStorFilHot();
    this.navCtrl.pop();
    let tgl =  this.tgl;
    let des = this.des;
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(FilterHotel1Page, { des, id, i, tgl });
  }

}
