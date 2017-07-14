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

  allocRoom = { sharingRooms: null, singleRoom: null, extraBed: null, sharingBed: null, babyCrib: null, noBed: null };
  totalGuest: any;
  totalAlloc: any;
  adult;
  child;
  infant;
  Tadult;
  Tchild;
  Tinfant;
  SR = { adult: 0, child: 0 };
  SiR = { adult: 0, child: 0 };
  EB = { adult: 0, child: 0 };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ite: IteneraryService,
    private viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {
    this.SR = { adult: 0, child: 0 };
    this.SiR = { adult: 0, child: 0 };
    this.EB = { adult: 0, child: 0 };
    this.allocRoom = { sharingRooms: 0, singleRoom: 0, extraBed: 0, sharingBed: 0, babyCrib: 0, noBed: 0 };
    this.adult = Number(this.ite.getPassenger().guestTour['AdultQty']);
    this.child = Number(this.ite.getPassenger().guestTour['ChildQty']);
    this.infant = Number(this.ite.getPassenger().guestTour['InfantQty']);
    this.Tadult = this.adult;
    this.Tchild = this.child;
    this.Tinfant = this.infant;
    this.totalGuest = this.dataGuest();
    this.totalAlloc = 0;
  }

  dataGuest() {
    return this.adult + this.child + this.infant;
  }

  decValue(par) {
    if (par == 'SRA') {
      if (this.SR.adult != 0) {
        this.SR.adult -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'SRC') {
      if (this.SR.child != 0) {
        this.SR.child -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'SiRA') {
      if (this.SiR.adult != 0) {
        this.SiR.adult -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'SiRC') {
      if (this.SiR.child != 0) {
        this.SiR.child -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'EBA') {
      if (this.EB.adult != 0) {
        this.EB.adult -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'EBC') {
      if (this.EB.child != 0) {
        this.EB.child -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'SB') {
      if (this.allocRoom.sharingBed != 0) {
        this.allocRoom.sharingBed -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'BC') {
      if (this.allocRoom.babyCrib != 0) {
        this.allocRoom.babyCrib -= 1;
        this.totalAlloc -= 1;
      }
    }
    else if (par == 'NB') {
      if (this.allocRoom.noBed != 0) {
        this.allocRoom.noBed -= 1;
        this.totalAlloc -= 1;
      }
    }
    this.allocRoom.sharingRooms = this.SR.adult + this.SR.child;
    this.allocRoom.singleRoom = this.SiR.adult + this.SiR.child;
    this.allocRoom.extraBed = this.EB.adult + this.EB.child;
    console.log(this.allocRoom);
    this.remainingGuest();
  }

  incValue(par) {
    if (par == 'SRA') {
      if(this.Tadult != 0){
      this.SR.adult += 1;
      this.totalAlloc += 1;
      }
    }
    else if (par == 'SRC') {
      if(this.Tchild !=0){
      this.SR.child += 1;
      this.totalAlloc += 1;
      }
    }
    else if (par == 'SiRA') {
       if(this.Tadult != 0){
      this.SiR.adult += 1;
      this.totalAlloc += 1;
       }
    }
    else if (par == 'SiRC') {
      if(this.Tchild !=0){
      this.SiR.child += 1;
      this.totalAlloc += 1;
      }
    }
    else if (par == 'EBA') {
      if(this.Tadult != 0){
      this.EB.adult += 1;
      this.totalAlloc += 1;
      }
    }
    else if (par == 'EBC') {
      if(this.Tchild !=0){
      this.EB.child += 1;
      this.totalAlloc += 1;
      }
    }
    else if (par == 'SB') {
      if(this.Tchild !=0){
        this.allocRoom.sharingBed += 1;
        this.totalAlloc += 1;
      }
    }
    else if (par == 'BC') {
       if(this.Tinfant !=0){
      this.allocRoom.babyCrib += 1;
      this.totalAlloc += 1;
       }
    }
    else if (par == 'NB') {
       if(this.Tinfant !=0){
      this.allocRoom.noBed += 1;
      this.totalAlloc += 1;
       }
    }
    this.allocRoom.sharingRooms = this.SR.adult + this.SR.child;
    this.allocRoom.singleRoom = this.SiR.adult + this.SiR.child;
    this.allocRoom.extraBed = this.EB.adult + this.EB.child;
    console.log(this.allocRoom);
    this.remainingGuest();
  }

  validateNumber(allocroom) {
    let SRA = Number(this.SR.adult)
    let SRC = Number(this.SR.child)
    let SiRA = Number(this.SiR.adult)
    let SiRC = Number(this.SiR.child)
    let EBA = Number(this.EB.adult)
    let EBC =  Number(this.EB.child)
    let SB = Number(allocroom.sharingBed)
    let BC = Number(allocroom.babyCrib)
    let NB = Number(allocroom.noBed)

    if (typeof SRA != "number" || String(SRA) == "NaN") {
      this.showAlertValidasi();
      this.SR.adult = 0;
    }
    else if (typeof SRC != "number" || String(SRC) == "NaN") {
      this.showAlertValidasi();
      this.SR.child = 0;   
    }
    else if (typeof SiRA != "number" || String(SiRA) == "NaN") {
      this.showAlertValidasi();
      this.SiR.adult = 0;
    }
    else if (typeof SiRC != "number" || String(SiRC) == "NaN") {
      this.showAlertValidasi();
      this.SiR.child = 0;
    }
    else if (typeof EBA != "number" || String(EBA) == "NaN") {
      this.showAlertValidasi();
      this.EB.adult = 0;
    } 
    else if (typeof EBC != "number" || String(EBC) == "NaN") {
      this.showAlertValidasi();
      this.EB.child = 0;
    } 
    else if (typeof SB != "number" || String(SB) == "NaN") {
      this.showAlertValidasi();
      this.allocRoom.sharingBed = 0;
    } else if (typeof BC != "number" || String(BC) == "NaN") {
      this.showAlertValidasi();
      this.allocRoom.babyCrib = 0;
    } else if (typeof NB != "number" || String(NB) == "NaN") {
      this.showAlertValidasi();
      this.allocRoom.noBed = 0;
    } else{
      if(SRA <= this.Tadult) this.SR.adult = SRA
      else this.SR.adult = this.Tadult

      if(SRC <= this.Tchild) this.SR.child = SRC
      else this.SR.child = this.Tchild


      if(SiRA <= this.Tadult) this.SiR.adult = SiRA
      else this.SiR.adult = this.Tadult


      if(SiRC <= this.Tchild) this.SiR.child = SiRC
      else this.SiR.child = this.Tchild


      if(EBA <= this.Tadult) this.EB.adult = EBA
      else this.EB.adult = this.Tadult

      if(EBC <= this.Tchild) this.EB.child = EBC
      else this.EB.child = this.Tchild

      if(SB <= this.Tchild) this.allocRoom.sharingBed = SB
      else  this.allocRoom.sharingBed  = this.Tchild

      if(BC <= this.Tinfant) this.allocRoom.babyCrib = BC
      else this.allocRoom.babyCrib = this.Tinfant
      
      if(NB <= this.Tinfant) this.allocRoom.noBed = NB
      else  this.allocRoom.noBed = this.Tinfant
      
    }
    this.allocRoom.sharingRooms = this.SR.adult + this.SR.child;
    this.allocRoom.singleRoom = this.SiR.adult + this.SiR.child;
    this.allocRoom.extraBed = this.EB.adult + this.EB.child;
    let a = this.allocRoom
    this.totalAlloc = a.sharingRooms + a.singleRoom + a.extraBed + a.sharingBed + a.babyCrib + a.noBed;
    this.remainingGuest();
  }

  remainingGuest() {
    let SRA = Number(this.SR.adult) //adult
    let SiRA = Number(this.SiR.adult) //adult
    let EBA = Number(this.EB.adult) //adult

    let SRC = Number(this.SR.child) //child
    let SiRC = Number(this.SiR.child) //child
    let EBC =  Number(this.EB.child) //child
    let SB = Number(this.allocRoom.sharingBed) //child

    let BC = Number(this.allocRoom.babyCrib) //infant
    let NB = Number(this.allocRoom.noBed) //infant
    let adult = SRA + SiRA + EBA;
    let child = SRC + SiRC + EBC + SB;
    let infant = BC + NB;
    
    this.Tadult = this.adult - adult;
    this.Tchild = this.child - child;
    this.Tinfant = this.infant - infant;
  }


  doneTapped(allocroom) {
    console.log(allocroom);
    let dataGuest = this.dataGuest();
    if (this.totalAlloc == dataGuest) {
      var data = JSON.stringify({ allocroom });
      this.ite.setRoomAllo(data);
      this.navCtrl.pop();
    } else this.showAlertAllocate();
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
