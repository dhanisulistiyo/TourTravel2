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

  constructor(public navCtrl: NavController, public ite : IteneraryService, public alertCtrl: AlertController) {
    this.guestTour = { AdultQty: 0, ChildQty: 0, InfantQty: 0}
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputTravellersPage');
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
