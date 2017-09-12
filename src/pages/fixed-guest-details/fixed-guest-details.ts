import { FixedpackageSummaryPage } from './../fixedpackage-summary/fixedpackage-summary';
import { HomeScreenPage } from './../home-screen/home-screen';
import { FixedPackageProvider } from './../../providers/fixed-package';
import { FixedpackagePaymentPage } from './../fixedpackage-payment/fixedpackage-payment';
import { LocationGuestPage } from './../location-guest/location-guest';
import { GuestServiceProvider } from './../../providers/guest-service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-fixed-guest-details',
  templateUrl: 'fixed-guest-details.html',
})
export class FixedGuestDetailsPage {
  Guest : Array<any>;
  ID
  Tour
  Price
  Package
  Title
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public gu : GuestServiceProvider, public alertCtrl: AlertController, public fix: FixedPackageProvider) {
    this.ID = ['Choose Type of ID','ID Card', 'Passport','Driving License']
    this.Title = ['Choose Title','Mr.', 'Mrs.']
    this.Package = navParams.data["pk"];
  }

    ionViewWillEnter(){
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
    
    setTitle(i, par){
      console.log(par, i)
      this.gu.setTitle(i, par);
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
        if (this.gu.getFirstName() == null || this.gu.getFirstName() == "" ) this.showAlertFirstName()
        else if (this.gu.getLastName() == null || this.gu.getLastName() == "" ) this.showAlertLastName()
        else if (this.gu.getCountry() == null || this.gu.getCountry() == "" ) this.showAlertCountry()
        else {       
          let pk = this.Package
          this.navCtrl.push(FixedpackageSummaryPage,{pk});
        }

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
