import { Component } from '@angular/core';
import {NavController, NavParams, ViewController } from 'ionic-angular';
import {DailyService} from '../../../providers/daily-service';
/**
 * Generated class for the TransportHoursPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-transport-hours',
  templateUrl: 'transport-hours.html',
})
export class TransportHoursPage {
idAwal;
idAkhir;
hours;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl:ViewController, public ds : DailyService) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
    this.hours =  navParams.data['ho']
    console.log( this.idAwal, this.idAkhir, this.hours)
}


setHours(hour){
    let id = this.idAwal;
    let i = this.idAkhir;
  this.ds.setHourTransport(id,i,hour);
  this.navCtrl.pop().then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
         this.navCtrl.remove(index - 1);
      });
}
}
