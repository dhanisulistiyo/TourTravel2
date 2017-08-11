import { MultiTransactionService } from './../../providers/multi-transaction-service';
import { PromoPackagePage } from './../promo-package/promo-package';
import { FixedPackagePage } from './../fixed-package/fixed-package';
import { IteneraryBuilderPage } from './../itenerary-builder/itenerary-builder';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeScreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html',
})
export class HomeScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mult : MultiTransactionService) {
  }

  ionViewDidEnter(){
      this.mult.clearCache();
  } 

  customMenu(){
    this.navCtrl.push(IteneraryBuilderPage);
  }
  fixedMenu(){
    this.navCtrl.push(FixedPackagePage);
  }

  promoMenu(){
    this.navCtrl.push(PromoPackagePage);
  }

}
