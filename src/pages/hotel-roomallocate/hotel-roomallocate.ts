import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
//import {IteneraryBuilderPage} from '../itenerary-builder/itenerary-builder';
import { IteneraryService } from '../../providers/itenerary-service';

/*
  Generated class for the HotelRoomallocate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hotel-roomallocate',
  templateUrl: 'hotel-roomallocate.html'
})
export class HotelRoomallocatePage {

  allocRoom = { sharingRooms: null, singleRoom: null, extraBed: null, sharingBed: null };
  totalGuest: any;
  adult;
  child;
  infant;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ite: IteneraryService,
    private viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {
    this.allocRoom = { sharingRooms: 0, singleRoom: 0, extraBed: 0, sharingBed: 0 };
    this.adult = Number(this.ite.getPassenger().guestTour['AdultQty']);
    this.child = Number(this.ite.getPassenger().guestTour['ChildQty']);
    this.infant = Number(this.ite.getPassenger().guestTour['InfantQty']);
    //this.totalGuest =  this.dataGuest();
    this.totalGuest = 0;
  }

  dataGuest() {
    return this.adult + this.child + this.infant;
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
        if(Number(allocroom.sharingBed)<= this.child){
          //untuk pengurangan
          // if(remGuest != 0)  this.totalGuest = this.dataGuest() - remGuest - this.infant;
          if(remGuest != 0)  this.totalGuest = remGuest
          else  this.totalGuest = remGuest
        }else this.showAlertChilds();
    }
  }


  // doneTapped(allocroom) {
  //   console.log(allocroom);
  //     let remGuest = this.remGuest(allocroom);
  //     let dataGuest = this.dataGuest();
  //     if(remGuest == dataGuest){
  //     var data = JSON.stringify({ allocroom });
  //     this.ite.setRoomAllo(data);
  //     this.navCtrl.pop().then(() => {
  //       // first we find the index of the current view controller:
  //       const index = this.viewCtrl.index;
  //       // then we remove it from the navigation stack
  //       this.navCtrl.remove(index);
  //       this.navCtrl.remove(index - 1);
  //       this.navCtrl.remove(index - 2);
  //     });
  //     }else this.showAlertAllocate();
  // }


  doneTapped(allocroom) {
    console.log(allocroom);
      let remGuest = this.remGuest(allocroom);
      let dataGuest = this.dataGuest() - this.infant;
      if(remGuest == dataGuest){
          var data = JSON.stringify({ allocroom });
          this.ite.setRoomAllo(data);
          this.navCtrl.pop();
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


 showAlertChilds() {
    let alert = this.alertCtrl.create({
      subTitle: 'Input Sharing Bed with Parents must less then or equals input childs',
      buttons: ['OK']
    });
    alert.present();
  }



}
