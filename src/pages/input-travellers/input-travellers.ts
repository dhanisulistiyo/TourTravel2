import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {IteneraryService} from '../../providers/itenerary-service';
//import {IteneraryBuilderPage} from '../itenerary-builder/itenerary-builder';

/*
  Generated class for the InputTravellers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-input-travellers',
  templateUrl: 'input-travellers.html'
})
export class InputTravellersPage {
  guestTour = { AdultQty: null, ChildQty: null, InfantQty: null};
  total;

  constructor(public navCtrl: NavController, public ite : IteneraryService, public alertCtrl: AlertController) {
    this.guestTour = { AdultQty: 0, ChildQty: 0, InfantQty: 0}
    this.total = 0;
  }

  incrAdultQty(index:number){
    this.guestTour.AdultQty += 1;
    console.log(this.guestTour.AdultQty);
    this.total +=1;
  }

  incrChildQty(index:number){
    this.guestTour.ChildQty += 1;
    console.log(this.guestTour.ChildQty);
    this.total +=1;
  }

  incrInfantQty(index:number){
    this.guestTour.InfantQty += 1;
    console.log(this.guestTour.InfantQty);
    this.total +=1;
  }

  decrAdultQty(index:number){
    if(this.guestTour.AdultQty != 0){
    this.guestTour.AdultQty -= 1;
    console.log(this.guestTour.AdultQty);
    this.total -=1;
    }
  }

  decrChildQty(index:number){
    if(this.guestTour.ChildQty != 0){
    this.guestTour.ChildQty -= 1;
    console.log(this.guestTour.ChildQty);
    this.total -=1;
    }
  }

  decrInfantQty(index:number){
    if(this.guestTour.InfantQty != 0){
    this.guestTour.InfantQty -= 1;
    console.log(this.guestTour.InfantQty);
    this.total -=1;
    }
  }
  
  validateNumber(guestTour){
      console.log(guestTour);
      let ga = Number(guestTour.AdultQty)
      let gc = Number(guestTour.ChildQty)
      let gi = Number(guestTour.InfantQty)

      if (typeof ga != "number"  || String(ga) == "NaN" ){
        this.showAlertAdult();
        this.guestTour.AdultQty = 0;
        this.total = this.guestTour.AdultQty + this.guestTour.ChildQty + this.guestTour.InfantQty;
        return
      }
      else if (typeof gc != "number" || String(gc) == "NaN" ){
        this.showAlertChild();
        this.guestTour.ChildQty = 0;
        this.total = this.guestTour.AdultQty + this.guestTour.ChildQty + this.guestTour.InfantQty;
        return
      }
      else if(typeof gi != "number"  || String(gi) == "NaN" ){
        this.showAlertInfant();
        this.guestTour.InfantQty = 0;
        this.total = this.guestTour.AdultQty + this.guestTour.ChildQty + this.guestTour.InfantQty;
        return
      }else{
        this.guestTour.AdultQty = ga
        this.guestTour.ChildQty = gc
        this.guestTour.InfantQty = gi
        this.total = ga+gc+gi;
      }

  }

  doneTapped(guestTour) {
      console.log(guestTour);
      let ga = Number(guestTour.AdultQty)
      let gc = Number(guestTour.ChildQty)
      let gi = Number(guestTour.InfantQty)
      if (typeof ga != "number"  || String(ga) == "NaN" ){
        this.showAlertAdult();
      }
      else if (typeof gc != "number" || String(gc) == "NaN" ){
        this.showAlertChild()
      }
      else if (typeof gi != "number"  || String(gi) == "NaN" ){
        this.showAlertInfant()
      } else
      {
      var data = JSON.stringify({guestTour});
      this.ite.setPassenger(data);
      this.navCtrl.pop();
      //this.navCtrl.push(IteneraryBuilderPage);
      }
  }


  showAlertAdult() {
    let alert = this.alertCtrl.create({
      subTitle: 'Input Adult Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

   showAlertChild() {
    let alert = this.alertCtrl.create({
      subTitle: 'Input Child Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertInfant() {
    let alert = this.alertCtrl.create({
      subTitle: 'Input Infant Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

}
