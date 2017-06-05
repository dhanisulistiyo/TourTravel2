import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {CustomePackagePage} from '../custome-package/custome-package';
import {MultiTransactionService} from '../../providers/multi-transaction-service';
/*
  Generated class for the ConfirmBooking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirm-booking',
  templateUrl: 'confirm-booking.html'
})
export class ConfirmBookingPage {
  BookingDetailSum: Array<any>;
  AccommodationSum: Array<any>;
  TransportationSum: Array<any>;
  AttractionSum: Array<any>;
  TourPriceSum: Array<any>;
  curency;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mulTra : MultiTransactionService, public alertCtrl : AlertController) {
  this.BookingDetailSum= null;
  this.AccommodationSum= null;
  this.TransportationSum= null;
  this.AttractionSum= null;
  this.TourPriceSum=null;
  this.curency=null;

  }

  ionViewWillEnter() {
    this.mulTra.mulDemoTransaction().subscribe(data=>{
            this.BookingDetailSum= Array.of(data['BookingDetailSum']);
            this.AccommodationSum=(data['AccommodationSum']);
            this.TransportationSum=(data['TransportationSum']);
            this.AttractionSum=(data['AttractionSum']);
            this.TourPriceSum=Array.of(data['TourPriceSum']);
      

            },err => {
                    console.log(err);
                },
                () => console.log('Get Transaction Complete')
            );
  }

  confirmTapped(event) {
    this.allertConfirmBooking();
  }


  allertConfirmBooking() {
    let prompt = this.alertCtrl.create({
      title: 'Confirm Booking',
      message: "Do you agree with this booking?",
      buttons: [
        {
          text: 'Cancel',
          handler: ()=> {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.mulTra.getTourTransaksi().subscribe(data=>{console.log(data);} ,err =>{console.log(err);}, ()=> console.log('post Transaction Complete'));
            console.log('Saved clicked');
            this.alertSuccess();
            
          }
        }
      ]
    });
    prompt.present();
  }



alertSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Booking Saved',
      subTitle: 'Your Booking has been saved in Sistem',
      buttons: [{
          text: 'OK',
          handler: ()=> {
            this.navCtrl.setRoot(CustomePackagePage);
            console.log('Saved clicked');
          }
        }]
    });
    alert.present();
  }
}
