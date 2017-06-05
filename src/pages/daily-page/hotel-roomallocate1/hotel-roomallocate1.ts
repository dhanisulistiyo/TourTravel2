
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { DailyService } from './../../../providers/daily-service';
import { IteneraryService } from './../../../providers/itenerary-service';
@Component({
  selector: 'page-hotel-roomallocate1',
  templateUrl: 'hotel-roomallocate1.html'
})
export class HotelRoomallocatePage1 {

  allocRoom = { sharingRooms: null, singleRoom: null, extraBed: null, sharingBed: null };
  totalGuest: any;
  idAwal;
  idAkhir;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ds: DailyService,
    public ite: IteneraryService,
    private viewCtrl: ViewController,
    public alertCtrl: AlertController

  ) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
    this.allocRoom = { sharingRooms: 0, singleRoom: 0, extraBed: 0, sharingBed: 0 };
    this.totalGuest = this.dataGuest();
  }

  dataGuest() {
    var adult = Number(this.ite.getPassenger().guestTour['AdultQty']);
    var child = Number(this.ite.getPassenger().guestTour['ChildQty']);
    var infant = Number(this.ite.getPassenger().guestTour['InfantQty']);
    return adult + child + infant;
  }

  remGuest(allocroom){
    let asha = Number(allocroom.sharingRooms)
    let asi = Number(allocroom.singleRoom)
    let ae = Number(allocroom.extraBed)
    let ash = Number(allocroom.sharingBed)
    return asha + asi + ae + ash;
  }

  guestRemaining(allocroom) {
    let remGuest = this.remGuest(allocroom);
    if (typeof remGuest != "number" || String(remGuest) == "NaN") {
      this.showAlertValidasi();
    }else{
    if(remGuest != 0)  this.totalGuest = this.dataGuest() - remGuest;
    else  this.totalGuest = this.dataGuest();

    }

  }


  doneTapped(allocroom) {
    console.log(allocroom);
      let remGuest = this.remGuest(allocroom);
      let dataGuest = this.dataGuest();
      let id = this.idAwal;
     let i = this.idAkhir;
      if(remGuest == dataGuest){
      this.ds.setRoomAllocate(id,i,allocroom);
      this.navCtrl.pop().then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
        this.navCtrl.remove(index - 1);
        this.navCtrl.remove(index - 2);
      });
      }else this.showAlertAllocate();
    
  }


  showAlertValidasi() {
    let alert = this.alertCtrl.create({
      subTitle: 'Input Data Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertAllocate() {
    let alert = this.alertCtrl.create({
      subTitle: 'Incorrect guest data allocation',
      buttons: ['OK']
    });
    alert.present();
  }

 


}
