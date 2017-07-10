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
    this.totalGuest = 0;
  }

  dataGuest() {
    return this.adult + this.child;
  }

  decValue(par){
   if (par == 'SR'){
      if(this.allocRoom.sharingRooms != 0){
      this.allocRoom.sharingRooms -= 1;
       this.totalGuest -=1;
      }
    }
    else if (par == 'SiR' ){
      if(this.allocRoom.singleRoom != 0){
      this.allocRoom.singleRoom -=1;
      this.totalGuest -=1;
      }
    }
    else if (par == 'EB' ){
      if(this.allocRoom.extraBed != 0){
      this.allocRoom.extraBed -=1;
      this.totalGuest -=1;
      }
    }
    else if(par == 'SB'){
      if(this.allocRoom.sharingBed != 0){
      this.allocRoom.sharingBed -=1;
      this.totalGuest -=1;
      }
    }
    
  }

  incValue(par){
    if (par == 'SR'){
      this.allocRoom.sharingRooms += 1;
      this.totalGuest +=1;
    }
    else if (par == 'SiR' ){
     this.allocRoom.singleRoom +=1;
     this.totalGuest +=1;
    }
    else if (par == 'EB' ){
      this.allocRoom.extraBed +=1;
      this.totalGuest +=1;
    }
    else if(par == 'SB'){
      if(this.allocRoom.sharingBed <= this.child){
      this.allocRoom.sharingBed +=1;
      this.totalGuest +=1;
      }else {this.showAlertChilds}
    }   
  }

   validateNumber(allocroom){
      console.log(allocroom);
      let SR = Number(allocroom.sharingRooms)
      let SiR = Number(allocroom.singleRoom)
      let EB = Number(allocroom.extraBed)
      let SB = Number(allocroom.sharingBed)
      if (typeof SR != "number"  || String(SR) == "NaN" ){
        this.showAlertValidasi();
        this.allocRoom.sharingRooms = 0;
        this.totalGuest = this.allocRoom.sharingRooms + this.allocRoom.singleRoom + this.allocRoom.extraBed +  this.allocRoom.sharingBed  ;
        return
      }
      else if (typeof SiR != "number" || String(SiR) == "NaN" ){
        this.showAlertValidasi();
        this.allocRoom.singleRoom = 0;
        this.totalGuest = this.allocRoom.sharingRooms + this.allocRoom.singleRoom + this.allocRoom.extraBed +  this.allocRoom.sharingBed  ;
        return
      }
      else if(typeof EB != "number"  || String(EB) == "NaN" ){
        this.showAlertValidasi();
        this.allocRoom.extraBed = 0;
        this.totalGuest = this.allocRoom.sharingRooms + this.allocRoom.singleRoom + this.allocRoom.extraBed +  this.allocRoom.sharingBed  ;
        return
      } else if(typeof SB != "number"  || String(SB) == "NaN" ){
        this.showAlertValidasi();
        this.allocRoom.sharingBed = 0;
        this.totalGuest = this.allocRoom.sharingRooms + this.allocRoom.singleRoom + this.allocRoom.extraBed +  this.allocRoom.sharingBed  ;
        return
      }else{
        this.allocRoom.sharingRooms = SR
        this.allocRoom.singleRoom = SiR
        this.allocRoom.extraBed = EB
        if(allocroom.sharingBed > this.child){
          this.showAlertChilds();
           this.allocRoom.sharingBed = this.child;
        }else { this.allocRoom.sharingBed = SB } 
        this.totalGuest = SR+SiR+EB+SB;
      }

  }

  remGuest(allocroom){
    let asha = Number(allocroom.sharingRooms)
    let asi = Number(allocroom.singleRoom)
    let ae = Number(allocroom.extraBed)
    let ash = Number(allocroom.sharingBed)
    return asha + asi + ae + ash;
  }

  // guestRemaining(allocroom) {
  //   let remGuest = this.remGuest(allocroom);
  //   if (typeof remGuest != "number" || String(remGuest) == "NaN") {
  //     this.showAlertValidasi();
  //   }else{
  //       if(Number(allocroom.sharingBed)<= this.child){
  //         //untuk pengurangan
  //         // if(remGuest != 0)  this.totalGuest = this.dataGuest() - remGuest - this.infant;
  //         if(remGuest != 0)  this.totalGuest = remGuest
  //         else  this.totalGuest = remGuest
  //       }else this.showAlertChilds();
  //   }
  // }

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

  // doneTapped(allocroom) {
  //   console.log(allocroom);
  //     let remGuest = this.remGuest(allocroom);
  //     let dataGuest = this.dataGuest() - this.infant;
  //     if(remGuest == dataGuest){
  //         var data = JSON.stringify({ allocroom });
  //         this.ite.setRoomAllo(data);
  //         this.navCtrl.pop();
  //     }else this.showAlertAllocate();
  // }

    doneTapped(allocroom) {
    console.log(allocroom);
      let remGuest = this.remGuest(allocroom);
      let dataGuest = this.dataGuest();
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
