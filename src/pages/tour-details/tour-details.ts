import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HistoryService } from '../../providers/history-service';
import { MultiTransactionService } from '../../providers/multi-transaction-service';
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
  BookingDetailSum: Array<any>;
  DailyPrograms: Array<any>;
  TourPriceSum: Array<any>;
  curency;
  selectedId: any;
  isValid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public his: HistoryService, 
  public mulTra: MultiTransactionService,
  public load: LoadingController) {
    this.BookingDetailSum = null;
    this.DailyPrograms = null;
    this.TourPriceSum = null;
    this.curency = null;
    this.selectedId = navParams.data;
    this.isValid = false;
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.his.getTransactionsSumarry(this.selectedId).subscribe(data => {
      this.BookingDetailSum = Array.of(data['BookingDetailSum']);
      this.DailyPrograms = (data['DailyPrograms'])
      this.TourPriceSum = Array.of(data['TourPriceSum']);
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


}
