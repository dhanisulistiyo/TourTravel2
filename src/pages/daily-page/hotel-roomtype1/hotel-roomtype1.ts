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
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef,
    public navParams: NavParams,
    public ds: DailyService,
    public aco: AcomodationService
  ) {
    this.idhot = navParams.data['ser']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']

  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelRoomtypePage');
  }

  ionViewWillEnter() {
    this.aco.getListItemAcomodation(this.idhot).subscribe(data => {
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
    let id = this.idAwal;
    let i = this.idAkhir;
    let type = (itemroom['AccommodationItemServiceTypes']);
    this.ds.setRoomType(id, i, itemroom);
    this.navCtrl.push(HotelRoomservicePage1, { id, i, type });
  }

}
