import { HomeScreenPage } from './../home-screen/home-screen';
import { FixedPackageProvider } from './../../providers/fixed-package';
import { UserandcompanyDetails } from './../../providers/userandcompany-details';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-fixedpackage-summary',
  templateUrl: 'fixedpackage-summary.html',
})
export class FixedpackageSummaryPage {
  Package;
  userinfo;
  Guest;
  Room;
  TotalGuest;
  TotalPrice;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public load: LoadingController, public info: UserandcompanyDetails, 
    public fix: FixedPackageProvider, public alertCtrl: AlertController) {
    this.Package = navParams.data['pk']
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.fix.memberGuest();
    let price = this.Package["Prices"]
    let g = this.fix.TGuest;
    this.Guest = this.fix.guest;
    this.TotalGuest=g.AdultQty+g.ChildQty +g.InfantQty    
    this.Room = this.fix.allocation;
    this.TotalPrice = (this.Room.AdultExtraBedPrice*price.AdultExtraBedPrice)+(this.Room.BabyCrib *0)+(this.Room.ChildExtraBedPrice*price.ChildExtraBedPrice)+(this.Room.NoBed*0)+(this.Room.SharingBedPrice*price.SharingBedPrice)+(this.Room.SharingRoomPrice*price.SharingRoomPrice)
    this.info.getUser().subscribe(data => {
      this.userinfo = data;
      loader.dismiss();
    }, err => {
      console.log(err);
      loader.dismiss();
    },
      () => console.log('Get User Complete')
    );
    
  }

  confirmBooking(){
    let prompt = this.alertCtrl.create({
      title: 'Confirm Booking',
      message: "Do you agree with this booking?",
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Saved clicked');
            this.fix.joinTour();
            this.navCtrl.setRoot(HomeScreenPage);
          }
        }
      ]
    });
    prompt.present();
  }

}
