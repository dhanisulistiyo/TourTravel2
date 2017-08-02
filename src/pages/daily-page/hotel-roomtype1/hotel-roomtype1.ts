import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HotelRoomservicePage1 } from '../hotel-roomservice1/hotel-roomservice1';
import { AcomodationService } from '../../../providers/acomodation-service';
import { DailyService } from '../../../providers/daily-service';

@Component({
  selector: 'page-hotel-roomtype1',
  templateUrl: 'hotel-roomtype1.html',
  providers: [AcomodationService]
})
export class HotelRoomtypePage1 {
  showToolbar: boolean = false;

  listroomtypes: Array<any>;
  idAwal;
  idAkhir;
  idhot;
  hotel;
  read;
  tgl;
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef,
    public navParams: NavParams,
    public ds: DailyService,
    public aco: AcomodationService
  ) {
    this.tgl = navParams.data['tgl']
    this.hotel = navParams.data['hot']
    this.idhot = navParams.data['ser']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
    this.read = false;
  }
  
  toggleDetails(data) {
    if (data) {
      this.read = false;
    } else {
     this.read = true;
    }
  }

    getNumber(n){
      return new Array(Number(n));
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }


  ionViewWillEnter() {
    this.aco.getListItemAcomodationDate(this.idhot, this.tgl).subscribe(data => {
      this.listroomtypes = data;
      console.log(this.listroomtypes);
    }, err => {
      console.log(err);
    },
      () => console.log('Room Type Search Complete')
    );
  }

  setSelectedRoomAllo(itemroom) {
    console.log(itemroom);
    let hotel = this.hotel;
    let id = this.idAwal;
    let i = this.idAkhir;
    let type = (itemroom['AccommodationItemServiceTypes']);
    this.navCtrl.push(HotelRoomservicePage1, { id, i, type, itemroom, hotel});
  }

}
