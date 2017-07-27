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
  ID
  constructor(public navCtrl: NavController, public navParams: NavParams, public gu : GuestServiceProvider) {
    this.Type = navParams.data['type'];
    console.log(this.Type);
    this.ID = ['Choose Type Guest','ID Card', 'Passport','Driving License']
  }

    ionViewWillEnter(){
    this.Guest = [];
    var no = Object.keys(this.gu.Guest).length;
        for (let i = 0; i < no; i++) {
          this.Guest.push(this.gu.Guest[i])
        }
        console.log(this.Guest)
    }
    setID(i, par){
      console.log(par, i)
      if (par == "ID Card" ) this.gu.setTypeId(i, "IDCARD");
      else if (par =="Passport") this.gu.setTypeId(i, "PASSPORT");
      else if (par =="Driving License") this.gu.setTypeId(i, "DRIVINGLICENSE");
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
