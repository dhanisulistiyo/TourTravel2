import { FixedPackageProvider } from './../../providers/fixed-package';
import { FixedGuestDetailsPage } from './../fixed-guest-details/fixed-guest-details';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FixedpackagePaymentPage } from './../fixedpackage-payment/fixedpackage-payment';
import { FixedRoomallocatePage } from './../fixed-roomallocate/fixed-roomallocate';
import { FixedInputtravellersPage } from './../fixed-inputtravellers/fixed-inputtravellers';

/**
 * Generated class for the FixedpackageGuestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-fixedpackage-guest',
  templateUrl: 'fixedpackage-guest.html',
})
export class FixedpackageGuestPage {
  showToolbar: boolean = false;
  listFixedPackage: Array<any>;
  guestTour = { AdultQty: null, ChildQty: null, InfantQty: null };
  passenger: string;
  total;
  maxGuest;
  kuota;
  typeG;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef, public alertCtrl: AlertController, private fixService: FixedPackageProvider) {
    this.guestTour = { AdultQty: 0, ChildQty: 0, InfantQty: 0 };
    this.total = 0;
    this.kuota = navParams.data['kuota'];
  }

  ionViewWillEnter() {
    this.fixService.showFixedPackage().subscribe(data => {
      this.listFixedPackage = data;
      console.log(data)
    }, err => {
      console.log(err);
    }, () => console.log("Fix Package Search Complete")
    );
  }
  incrAdultQty(index: number) {
    this.guestTour.AdultQty += 1;
    console.log(this.guestTour.AdultQty);
    this.total += 1;
  }
  incrChildQty(index: number) {
    this.guestTour.ChildQty += 1;
    console.log(this.guestTour.ChildQty);
    this.total += 1;
  }
  incrInfantQty(index: number) {
    this.guestTour.InfantQty += 1;
    console.log(this.guestTour.InfantQty);
    this.total += 1;
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

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedpackageGuestPage');
  }
  showAlertGuest() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'Please Input Guest Tour ',
      buttons: ['OK']
    });
    alert.present();
  }
  passengerTapped() {
    this.navCtrl.push(FixedInputtravellersPage)
  }
  hotelTapped() {
    //if (this.passenger == '') this.showAlertGuest();
    this.navCtrl.push(FixedRoomallocatePage);
  }

  continueTapped(){
    this.navCtrl.push(FixedGuestDetailsPage);
  }

}
