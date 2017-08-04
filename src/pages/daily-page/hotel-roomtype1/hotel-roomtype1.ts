import { IteneraryService } from './../../../providers/itenerary-service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    public aco: AcomodationService,
    public alertCtrl: AlertController, 
    public it: IteneraryService
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
    let today = (+new Date(this.tgl));
    let before = (+new Date(itemroom.StayingPeriodTo))
    let endTour = (+new Date(this.it.getDateTour().ev['monthEnd']));
    let b = (endTour-today)/86400000;
    let a = Math.round((before-today)/86400000);
    let x = itemroom.MinDays;

    if(itemroom.IsPromo){
          if(itemroom.CutOffDate == null){
              if( b < x ) this.showAlertForPromo();
              else if(a < x) this.showAlertForPromo();
              
              else this.postDataNextSc(itemroom);
              
          }else{
            let beforeCut= (+new Date(itemroom.StayingPeriodTo))
            let c = Math.round((beforeCut-today)/86400000);
            if( b < x ) this.showAlertForPromo();
            else if ( c < x ) this.showAlertForPromo();
            else this.postDataNextSc(itemroom);     
          }
    
    }else{
         this.postDataNextSc(itemroom);
    }
  }


  postDataNextSc(itemroom){
          let hotel = this.hotel;
          let id = this.idAwal;
          let i = this.idAkhir;
          let type = (itemroom['AccommodationItemServiceTypes']);
          this.navCtrl.push(HotelRoomservicePage1, { id, i, type, itemroom, hotel});
  }


  showAlertForPromo() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Booking Room Less Then Minumum Night',
      buttons: ['OK']
    });
    alert.present();
  }


}
