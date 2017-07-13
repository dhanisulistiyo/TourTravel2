import { Component } from '@angular/core';
import { NavController, NavParams,AlertController , LoadingController} from 'ionic-angular';
import {PaymentPage} from '../payment/payment';
import {MultiTransactionService} from '../../providers/multi-transaction-service';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';
//import {DailyService} from '../../providers/daily-service';

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
  data: Array<{info: any, icon: string, showDetails: boolean }> = [];
  BookingDetailSum: Array<any>;
  DailyPrograms: Array<any>;
  TourPriceSum: Array<any>;
  curency;
  userinfo;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public mulTra : MultiTransactionService, 
  public alertCtrl : AlertController,
  public load: LoadingController,
  public info:UserandcompanyDetails
  ) {
  this.BookingDetailSum= null;
  this.DailyPrograms= null;
  this.TourPriceSum=null;
  this.curency=null;

  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();


    this.info.getUser().subscribe(data=>{
      this.userinfo = data;
    },err => {
                    console.log(err);
                    //loader.dismiss();
                },
                () => console.log('Get Transaction Complete')
    );   

    this.mulTra.mulDemoTransaction().subscribe(data=>{
            this.BookingDetailSum= Array.of(data['BookingDetailSum']);
            this.DailyPrograms = (data['DailyPrograms'])
            this.TourPriceSum=Array.of(data['TourPriceSum']);
             this.data.push({
        info: "Tour Detail",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

       this.data.push({
        info: "Room Allocation",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

      this.data.push({
        info: "Tour Prices",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

       this.data.push({
        info: "Tour Schedules",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });


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


 toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-arrow-dropright-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-arrow-dropdown-outline';
    }
  }

  allertConfirmBooking() {
    let id = this.BookingDetailSum['Id'];
    let status = "confirm"
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
            let loader = this.load.create({
              content: 'Please wait...'
            });
            loader.present();
            this.mulTra.getTourTransaksi().subscribe(data => { console.log(data); }, err => { console.log(err); }, () => console.log('post Transaction Complete'));
            loader.dismiss();
            this.navCtrl.push(PaymentPage,{id, status});
            //this.alertSuccess();         
          }
        }
      ]
    });
    prompt.present();
  }
}
