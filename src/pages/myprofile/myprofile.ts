import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';

/**
 * Generated class for the MyprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
  Profile
  constructor(public navCtrl: NavController, public navParams: NavParams, public info : UserandcompanyDetails) {
    this.Profile = this.info.userinfo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }

}
