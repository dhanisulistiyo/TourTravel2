import { HomeScreenPage } from './../home-screen/home-screen';
import { UserandcompanyDetails } from './../../providers/userandcompany-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public info: UserandcompanyDetails) {
  }

  ionViewWillEnter() {
    this.userinfo = this.info.userinfo;
    this.companyInfo = this.info.companyInfo;
}

payTour() {
  this.navCtrl.push(HomeScreenPage);

}

}
