import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HistoryService } from '../../providers/history-service';
import { MultiTransactionService } from '../../providers/multi-transaction-service';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';
import {PaymentPage} from '../payment/payment';
/*
  Generated class for the TourDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tour-details',
  templateUrl: 'tour-details.html'
})
export class TourDetailsPage {

  data: Array<{info: any, icon: string, showDetails: boolean }> = [];
  BookingDetailSum: Array<any>;
  DailyPrograms: Array<any>;
  TourPriceSum: Array<any>;
  TourGuest: Array<any>;
  curency;
  selectedId: any;
  isValid;
  userinfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, public his: HistoryService, 
  public mulTra: MultiTransactionService,
  public load: LoadingController,
  public info:UserandcompanyDetails,
    public alertCtrl : AlertController,
  ) {
    this.BookingDetailSum = null;
    this.DailyPrograms = null;
    this.TourPriceSum = null;
    this.TourGuest = null;
    this.curency = null;
    this.selectedId = navParams.data;
    this.isValid = false;
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

    this.his.getTransactionsSumarry(this.selectedId).subscribe(data => {
      this.BookingDetailSum = Array.of(data['BookingDetailSum']);
      this.TourGuest =(data['TourGuestSum']);
      this.DailyPrograms = (data['DailyPrograms'])
      this.TourPriceSum = Array.of(data['TourPriceSum']);
      

      this.data.push({
        info: "Tour Detail",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

       this.data.push({
        info: "Guest Detail",
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

      console.log(this.data)
      loader.dismiss();

      if (this.BookingDetailSum[0].Status == 'Booking_created') {
        this.isValid = true;
      }
    }, err => {
      console.log(err);
    },
      () => console.log('Get Transaction Complete')
    );
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

  confirmTour() {
    let status = "confirm"
    this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, status)
    this.navCtrl.pop();
  }

  cancelTour() {
    let status = "cancel"
    this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, status)
    this.navCtrl.pop();

  }


  allertConfirmBooking() {
    let details = this.BookingDetailSum;
    let status = "created"
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
            this.navCtrl.push(PaymentPage,{status, details});       
          }
        }
      ]
    });
    prompt.present();
  }


allertCancelBooking() {
    let details = this.BookingDetailSum;
    let status = "confirm"
    let prompt = this.alertCtrl.create({
      title: 'Cancel Booking',
      message: "Do you agree cancel this booking?",
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
            this.cancelTour();       
          }
        }
      ]
    });
    prompt.present();
  }


}
