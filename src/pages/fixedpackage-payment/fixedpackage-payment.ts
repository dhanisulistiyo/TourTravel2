import { FixedPackageProvider } from './../../providers/fixed-package';
import { HomeScreenPage } from './../home-screen/home-screen';
import { UserandcompanyDetails } from './../../providers/userandcompany-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FixedpackagePaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fixedpackage-payment',
  templateUrl: 'fixedpackage-payment.html',
})
export class FixedpackagePaymentPage {
  companyInfo;
  userinfo
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public info: UserandcompanyDetails, private viewCtrl: ViewController, public fix: FixedPackageProvider) {
  }

  ionViewWillEnter() {
    this.userinfo = this.info.userinfo;
    this.companyInfo = this.info.companyInfo;
}

  payTour() {
  //this.navCtrl.push(HomeScreenPage);
  this.navCtrl.setRoot(HomeScreenPage);
  // this.navCtrl.pop().then(() => {
  //   const index = this.viewCtrl.index;
  //   this.navCtrl.remove(index-1);
  //   this.navCtrl.remove(index-1);
  //   this.navCtrl.remove(index);
  //   });
  }

  
}
