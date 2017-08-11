import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';


/**
 * Generated class for the MycompanyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-mycompany',
  templateUrl: 'mycompany.html',
})
export class MycompanyPage {
  Company;
  constructor(public navCtrl: NavController, public navParams: NavParams, public info : UserandcompanyDetails) {
    this.Company = this.info.companyInfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycompanyPage');
  }

  ionViewWillEnter() {
    
  }
}