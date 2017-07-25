import { LocationGuestPage } from './../location-guest/location-guest';
import { DailyProgram } from './../daily-program/daily-program';
import { GuestServiceProvider } from './../../providers/guest-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GuestDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-guest-details',
  templateUrl: 'guest-details.html',
})
export class GuestDetailsPage {
  Guest : Array<any>;
  Type;
  constructor(public navCtrl: NavController, public navParams: NavParams, public gu : GuestServiceProvider) {
    this.Type = navParams.data['type'];
    console.log(this.Type);
  }

    ionViewWillEnter(){
    this.Guest = [];
    var no = Object.keys(this.gu.Guest).length;
        for (let i = 0; i < no; i++) {
          this.Guest.push(this.gu.Guest[i])
        }
        console.log(this.Guest)
    }

    inputId(i, event){
        var data = event.target.value;
        this.gu.setId(i, data);
    }

    inputFirstName(i, event){
        var data = event.target.value;
        this.gu.setFirstName(i, data);
    }

    inputLastName(i, event){
      var data = event.target.value;
      this.gu.setLastName(i, data);
    }

    inputCountry(i, event){
      var data = event.target.value;
      this.navCtrl.push(LocationGuestPage,{i});
    }

    createItenerary(event) {
        this.navCtrl.push(DailyProgram);

    }

} 
