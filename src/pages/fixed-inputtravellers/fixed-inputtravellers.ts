import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { IteneraryService } from '../../providers/itenerary-service';

/**
 * Generated class for the FixedInputtravellersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-fixed-inputtravellers',
  templateUrl: 'fixed-inputtravellers.html',
})
export class FixedInputtravellersPage {
guestTour = { AdultQty: null, ChildQty: null, InfantQty: null };
  total;
  maxGuest;
  kuota
  constructor(public navCtrl: NavController, public navParams: NavParams, public ite: IteneraryService, public alertCtrl: AlertController) {
    this.guestTour = { AdultQty: 0, ChildQty: 0, InfantQty: 0 }
    this.total = 0;
    this.maxGuest = navParams.data['count']
    this.kuota = navParams.data['kuota']
  }

  incrAdultQty(index: number) {
    if (this.total < this.maxGuest) {
      this.guestTour.AdultQty += 1;
      console.log(this.guestTour.AdultQty);
      this.total += 1;
    }
  }

  incrChildQty(index: number) {
   if (this.total < this.maxGuest) {
    this.guestTour.ChildQty += 1;
    console.log(this.guestTour.ChildQty);
    this.total += 1;
   }
  }

  incrInfantQty(index: number) {
     if (this.total < this.maxGuest) {
    this.guestTour.InfantQty += 1;
    console.log(this.guestTour.InfantQty);
    this.total += 1;
     }
  }

  decrAdultQty(index: number) {
    if (this.guestTour.AdultQty != 0) {
      this.guestTour.AdultQty -= 1;
      console.log(this.guestTour.AdultQty);
      this.total -= 1;
    }
  }

  decrChildQty(index: number) {
    if (this.guestTour.ChildQty != 0) {
      this.guestTour.ChildQty -= 1;
      console.log(this.guestTour.ChildQty);
      this.total -= 1;
    }
  }

  decrInfantQty(index: number) {
    if (this.guestTour.InfantQty != 0) {
      this.guestTour.InfantQty -= 1;
      console.log(this.guestTour.InfantQty);
      this.total -= 1;
    }
  }

  validateNumber(guestTour) {
    console.log(guestTour);
    let ga = Number(guestTour.AdultQty)
    let gc = Number(guestTour.ChildQty)
    let gi = Number(guestTour.InfantQty)

    if (typeof ga != "number" || String(ga) == "NaN") {
      this.showAlertAdult();
      this.guestTour.AdultQty = 0;
      this.total = this.guestTour.AdultQty + this.guestTour.ChildQty + this.guestTour.InfantQty;
      return
       
    }
    else if (typeof gc != "number" || String(gc) == "NaN") {
       
      this.showAlertChild();
      this.guestTour.ChildQty = 0;
      this.total = this.guestTour.AdultQty + this.guestTour.ChildQty + this.guestTour.InfantQty;
      return
       
    }
    else if (typeof gi != "number" || String(gi) == "NaN") {
     
      this.showAlertInfant();
      this.guestTour.InfantQty = 0;
      this.total = this.guestTour.AdultQty + this.guestTour.ChildQty + this.guestTour.InfantQty;
      return
       
    } else {
        this.guestTour.AdultQty = ga
        this.guestTour.ChildQty = gc
        this.guestTour.InfantQty = gi
        this.total = ga + gc + gi;
        if (this.total > this.maxGuest) {
          this.showAlertTotal();
        }
        return ;
    }

  }

  doneTapped(guestTour) {
    console.log(guestTour);
    let ga = Number(guestTour.AdultQty)
    let gc = Number(guestTour.ChildQty)
    let gi = Number(guestTour.InfantQty)
    if (typeof ga != "number" || String(ga) == "NaN") {
      this.showAlertAdult();
    }
    else if (typeof gc != "number" || String(gc) == "NaN") {
      this.showAlertChild()
    }
    else if (typeof gi != "number" || String(gi) == "NaN") {
      this.showAlertInfant()
    } else {
        if(this.total<= this.maxGuest){
            var data = JSON.stringify({ guestTour });
            if(this.kuota=="Large Group"){
                if(this.total<10){
                    this.showAlertLarge();
                }else{
                  this.ite.setPassenger(data);
                  this.navCtrl.pop();
                }
            }else{
              this.ite.setPassenger(data);
              this.navCtrl.pop();
            }
            
        }else{
          this.showAlertTotal();
        }
      //this.navCtrl.push(IteneraryBuilderPage);
    }
  }

remainingG(){
    return (this.maxGuest - this.total)

}
  showAlertAdult() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Adult Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertChild() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Child Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertInfant() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Infant Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertLarge() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Total Person more then 10 Persons',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertTotal() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'This type guest only '+this.maxGuest+' person, please change type if you want',
      buttons: ['OK']
    });
    alert.present();
  }

}
