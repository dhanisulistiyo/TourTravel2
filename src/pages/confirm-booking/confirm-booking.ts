import { Component } from '@angular/core';
import { NavController, NavParams,AlertController , LoadingController} from 'ionic-angular';
import {PaymentPage} from '../payment/payment';
import {MultiTransactionService} from '../../providers/multi-transaction-service';
import {DailyService} from '../../providers/daily-service';

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
  DailyPrograms: Array<any>;
  TourPriceSum: Array<any>;
  curency;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public mulTra : MultiTransactionService, 
  public alertCtrl : AlertController,
  public load: LoadingController
  ) {
  this.BookingDetailSum= null;
  this.DailyPrograms= null;
  this.TourPriceSum=null;
  this.curency=null;

  }

  ionViewWillEnter() {
    //this.DailyPrograms=[]
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.mulTra.mulDemoTransaction().subscribe(data=>{
            this.BookingDetailSum= Array.of(data['BookingDetailSum']);
            this.DailyPrograms = (data['DailyPrograms'])
            console.log(this.DailyPrograms)
            this.TourPriceSum=Array.of(data['TourPriceSum']);
            loader.dismiss();
            },err => {
                    console.log(err);
                    loader.dismiss();
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
            console.log('Saved clicked');
            this.navCtrl.push(PaymentPage);
            //this.alertSuccess();         
          }
        }
      ]
    });
    prompt.present();
  }
}
