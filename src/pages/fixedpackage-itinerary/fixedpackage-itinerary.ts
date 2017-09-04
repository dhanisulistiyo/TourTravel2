import { DailyService } from './../../providers/daily-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FixedpackageItineraryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fixedpackage-itinerary',
  templateUrl: 'fixedpackage-itinerary.html',
})
export class FixedpackageItineraryPage {
  DP
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.DP = navParams.data['dp']
  }
}