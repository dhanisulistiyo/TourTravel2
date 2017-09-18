import { ReadyDailyprogramPage } from './../ready-dailyprogram/ready-dailyprogram';
import { LocationGuestPage } from './../location-guest/location-guest';
import { DailyProgram } from './../daily-program/daily-program';
import { GuestServiceProvider } from './../../providers/guest-service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the GuestDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-guest-details',
  templateUrl: 'guest-details.html',
})
export class GuestDetailsPage {
  Guest : Array<any>;
  Type;
  ID;
  Title;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public gu : GuestServiceProvider, public alertCtrl: AlertController) {
    this.Type = navParams.data['type'];
    this.ID = ['Choose Type of ID','ID Card', 'Passport','Driving License']
    this.Title = ['Choose Title','Mr.', 'Mrs.', 'Ms.']
    this.Guest = [];
    var no = Object.keys(this.gu.Guest).length;
        for (let i = 0; i < no; i++) {
          this.Guest.push(this.gu.Guest[i])
        }
        console.log(this.Guest)
  }
  setID(par, i ){
    console.log(par, i)
    if (par == "ID Card" ) this.gu.setTypeId(i, "IDCARD");
    else if (par =="Passport") this.gu.setTypeId(i, "PASSPORT");
    else if (par =="Driving License") this.gu.setTypeId(i, "DRIVINGLICENSE");
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
        // if (this.gu.getFirstName() == null || this.gu.getFirstName() == "" ) this.showAlertFirstName()
        // else if (this.gu.getLastName() == null || this.gu.getLastName() == "" ) this.showAlertLastName()
        // else if (this.gu.getCountry() == null || this.gu.getCountry() == "" ) this.showAlertCountry()
        //else 
        if(this.Type == "READY") this.navCtrl.push(ReadyDailyprogramPage);
        else this.navCtrl.push(DailyProgram);

    }


    showAlertFirstName() {
      let alert = this.alertCtrl.create({
        title: 'Failed!',
        subTitle: 'Please Input Firstname Leader',
        buttons: ['OK']
      });
      alert.present();
    }

    showAlertLastName() {
      let alert = this.alertCtrl.create({
        title: 'Failed!',
        subTitle: 'Please Input Lastname Leader',
        buttons: ['OK']
      });
      alert.present();
    }

    showAlertCountry() {
      let alert = this.alertCtrl.create({
        title: 'Failed!',
        subTitle: 'Please Choose Country Leader',
        buttons: ['OK']
      });
      alert.present();
    }
} 
