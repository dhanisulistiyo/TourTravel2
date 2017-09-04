import { GuestServiceProvider } from './../../providers/guest-service';
import { FixedPackageProvider } from './../../providers/fixed-package';
import { FixedGuestDetailsPage } from './../fixed-guest-details/fixed-guest-details';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FixedpackagePaymentPage } from './../fixedpackage-payment/fixedpackage-payment';
import { FixedRoomallocatePage } from './../fixed-roomallocate/fixed-roomallocate';
import { FixedInputtravellersPage } from './../fixed-inputtravellers/fixed-inputtravellers';
@Component({
  selector: 'page-fixedpackage-guest',
  templateUrl: 'fixedpackage-guest.html',
})
export class FixedpackageGuestPage {
  showToolbar: boolean = false;
  listFixedPackage
  prices
  guestTour = { AdultQty: null, ChildQty: null, InfantQty: null };
  roomAlloc = { SharingRoomPrice: null, AdultExtraBedPrice: null, ChildExtraBedPrice: null, SharingBedPrice: null, BabyCrib: null, NoBed: null }
  total;
  totalPrice;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef, public alertCtrl: AlertController,
    private fixService: FixedPackageProvider, public gu: GuestServiceProvider) {
    this.guestTour = { AdultQty: 0, ChildQty: 0, InfantQty: 0 };
    this.roomAlloc = { SharingRoomPrice: 0, AdultExtraBedPrice: 0, ChildExtraBedPrice: 0, SharingBedPrice: 0, BabyCrib: 0, NoBed: 0 }
    this.total = 0;
    this.totalPrice = 0;
    this.listFixedPackage = navParams.data['res'];
    this.prices = navParams.data['price'];
    console.log(this.listFixedPackage)
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }
  //Guest
  incrAdultQty(index: number) {
    if (this.total < this.listFixedPackage.FixedPackage.MaximumGuest) {
      this.guestTour.AdultQty += 1;
      console.log(this.guestTour.AdultQty);
      this.total += 1;
    }
  }
  incrChildQty(index: number) {
    if (this.total < this.listFixedPackage.FixedPackage.MaximumGuest) {
      this.guestTour.ChildQty += 1;
      console.log(this.guestTour.ChildQty);
      this.total += 1;
    }
  }
  incrInfantQty(index: number) {
    if (this.total < this.listFixedPackage.FixedPackage.MaximumGuest) {
      this.guestTour.InfantQty += 1;
      console.log(this.guestTour.InfantQty);
      this.total += 1;
    }
  }
  decrAdultQty(index: number) {
    if (this.guestTour.AdultQty != 0) {
      this.guestTour.AdultQty -= 1;
      console.log(this.guestTour.AdultQty)
      this.total -= 1;
    }
  }
  decrChildQty(index: number) {
    if (this.guestTour.ChildQty != 0) {
      this.guestTour.ChildQty -= 1;
      console.log(this.guestTour.ChildQty)
      this.total -= 1;
    }
  }
  decrInfantQty(index: number) {
    if (this.guestTour.InfantQty != 0) {
      this.guestTour.InfantQty -= 1;
      console.log(this.guestTour.InfantQty)
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
      let max = this.listFixedPackage.FixedPackage.MaximumGuest;
      if (ga > max - gc - gi) { this.guestTour.AdultQty = 0; this.showAlertTotal(); }
      else if (gc > max - ga - gi) { this.guestTour.ChildQty = 0; this.showAlertTotal(); }
      else if (gi > max - ga - gc) { this.guestTour.InfantQty = 0; this.showAlertTotal(); }
      else {
        this.guestTour.AdultQty = ga
        this.guestTour.ChildQty = gc
        this.guestTour.InfantQty = gi
        this.total = ga + gc + gi;
      }
      return;
    }

  }
  //Allocation
  incrShareQty(index: number) {
    if (this.guestTour.AdultQty != 0 || this.guestTour.ChildQty != 0) {
      this.roomAlloc.SharingRoomPrice += 1;
      this.totalPrices();
    }
  }
  incrAdultExQty(index: number) {
    if (this.guestTour.AdultQty != 0) {
      if (this.roomAlloc.AdultExtraBedPrice < this.guestTour.AdultQty) {
        this.roomAlloc.AdultExtraBedPrice += 1;
        this.totalPrices();
      }
    }
  }
  incrChildExQty(index: number) {
    if (this.guestTour.ChildQty != 0) {
      if (this.roomAlloc.ChildExtraBedPrice < this.guestTour.ChildQty) {
        this.roomAlloc.ChildExtraBedPrice += 1;
        this.totalPrices();
      }
    }
  }
  incrBedQty(index: number) {
    if (this.guestTour.ChildQty != 0) {
      if (this.roomAlloc.SharingBedPrice < this.guestTour.ChildQty) {
        this.roomAlloc.SharingBedPrice += 1;
        this.totalPrices();
      }
    }
  }
  incrBabyCrib(index: number) {
    if (this.guestTour.InfantQty != 0) {
      this.roomAlloc.BabyCrib += 1;
      this.totalPrices();
    }
  }
  incrNoBed(index: number) {
    if (this.guestTour.InfantQty != 0) {
      this.roomAlloc.NoBed += 1;
      this.totalPrices();
    }
  }

  decrShareQty(index: number) {
    if (this.roomAlloc.SharingRoomPrice != 0) {
      this.roomAlloc.SharingRoomPrice -= 1;
      console.log(this.roomAlloc.SharingRoomPrice);
      this.totalPrices();
    }
  }
  decrAdultExQty(index: number) {
    if (this.roomAlloc.AdultExtraBedPrice != 0) {
      this.roomAlloc.AdultExtraBedPrice -= 1;
      console.log(this.roomAlloc.AdultExtraBedPrice);
      this.totalPrices();
    }
  }
  decrChildExQty(index: number) {
    if (this.roomAlloc.ChildExtraBedPrice != 0) {
      this.roomAlloc.ChildExtraBedPrice -= 1;
      console.log(this.roomAlloc.ChildExtraBedPrice);
      this.totalPrices();
    }
  }
  decrBedQty(index: number) {
    if (this.roomAlloc.SharingBedPrice != 0) {
      this.roomAlloc.SharingBedPrice -= 1;
      console.log(this.roomAlloc.SharingBedPrice);
      this.totalPrices();
    }
  }
  decrBabyCrib(index: number) {
    if (this.roomAlloc.BabyCrib != 0) {
      this.roomAlloc.BabyCrib -= 1;
      this.totalPrices();
    }
  }
  decrNoBed(index: number) {
    if (this.roomAlloc.NoBed != 0) {
      this.roomAlloc.NoBed -= 1;
      this.totalPrices();
    }
  }
  validateNumberAlloc(roomAlloc) {
    console.log(roomAlloc);
    let SR = Number(roomAlloc.SharingRoomPrice)
    let AE = Number(roomAlloc.AdultExtraBedPrice)
    let CE = Number(roomAlloc.ChildExtraBedPrice)
    let SB = Number(roomAlloc.SharingBedPrice)
    let BC = Number(roomAlloc.BabyCrib)
    let NB = Number(roomAlloc.NoBed)
    if (typeof SR != "number" || String(SR) == "NaN") {
      this.roomAlloc.SharingRoomPrice = 0;
      this.showAlertSR();
      this.totalPrices();
      return
    }
    else if (typeof AE != "number" || String(AE) == "NaN") {
      this.roomAlloc.AdultExtraBedPrice = 0;
      this.showAlertAE();
      this.totalPrices();
      return
    }
    else if (typeof CE != "number" || String(CE) == "NaN") {
      this.roomAlloc.ChildExtraBedPrice = 0;
      this.showAlertCE();
      this.totalPrices();
      return
    }
    else if (typeof SB != "number" || String(SB) == "NaN") {
      this.roomAlloc.SharingBedPrice = 0;
      this.showAlertSB();
      this.totalPrice();
      return
    } else if (typeof BC != "number" || String(BC) == "NaN") {
      this.roomAlloc.BabyCrib = 0;
      this.showAlertBC();
      this.totalPrice();
      return
    } else if (typeof NB != "number" || String(NB) == "NaN") {
      this.roomAlloc.NoBed = 0;
      this.showAlertNB();
      this.totalPrice();
      return
    }
    else {
      this.roomAlloc.SharingRoomPrice = SR
      this.roomAlloc.AdultExtraBedPrice = AE
      this.roomAlloc.ChildExtraBedPrice = CE
      this.roomAlloc.SharingBedPrice = SB
      this.roomAlloc.BabyCrib = BC
      this.roomAlloc.NoBed = NB
      let totalGuest = this.guestTour.AdultQty + this.guestTour.ChildQty
      let totalAlloc = SR + AE + CE + SB + BC + NB
      this.totalPrices();
      return;
    }

  }
  totalPrices() {
    let A2 = this.prices.SharingRoomPrice
    let B2 = this.prices.AdultExtraBedPrice
    let C2 = this.prices.ChildExtraBedPrice
    let D2 = this.prices.SharingBedPrice
    this.totalPrice = (this.roomAlloc.SharingRoomPrice * A2) + (this.roomAlloc.AdultExtraBedPrice * B2) + (this.roomAlloc.ChildExtraBedPrice * C2) + (this.roomAlloc.SharingBedPrice * D2)

  }

  showAlertGuest() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please Input Guest Tour ',
      buttons: ['OK']
    });
    alert.present();
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
  showAlertTotal() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'This fixed package max guest only ' + this.listFixedPackage.FixedPackage.MaximumGuest + ' person!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertSR() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Sharing Room Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertAE() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Adult Extra Bed Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertCE() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Child Extra Bed Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertSB() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Sharing Bed Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertBC() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input Baby Crib is Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertNB() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Input!',
      subTitle: 'Input No Bed is Not Number',
      buttons: ['OK']
    });
    alert.present();
  }

  continueTapped() {
    let guest = this.guestTour.AdultQty + this.guestTour.ChildQty + this.guestTour.InfantQty
    let alloc = this.roomAlloc.AdultExtraBedPrice + this.roomAlloc.ChildExtraBedPrice + this.roomAlloc.SharingBedPrice + this.roomAlloc.SharingRoomPrice + this.roomAlloc.BabyCrib
    if (guest != 0) {
      if (guest <= (this.listFixedPackage.FixedPackage.MaximumGuest - this.listFixedPackage.FixedPackage.RegisteringGuest)) {
        if (guest == alloc) {
          this.fixService.setRoomAllo(this.roomAlloc)
          this.fixService.setGuest(this.guestTour)
          this.gu.createGuestFix(this.guestTour.AdultQty, this.guestTour.ChildQty, this.guestTour.InfantQty);
          this.navCtrl.push(FixedGuestDetailsPage);
        } else { this.showAlertTotalAlloc(); }
      } else { this.showAlertMaxGuest() }
    } else {
      this.showAlertInputGuest();
    }

  }

  showAlertTotalAlloc() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Allocation Guest Only ' + this.guestTour.AdultQty + ' Adult(S) and ' + this.guestTour.ChildQty + ' Child(s)!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertInputGuest() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please input guest!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertMaxGuest() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Total guest registered more than max guest',
      buttons: ['OK']
    });
    alert.present();
  }

}
