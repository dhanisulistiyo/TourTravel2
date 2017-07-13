import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HistoryService } from '../../providers/history-service';
import { MultiTransactionService } from '../../providers/multi-transaction-service';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';
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
  curency;
  selectedId: any;
  isValid;
  userinfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, public his: HistoryService, 
  public mulTra: MultiTransactionService,
  public load: LoadingController,
  public info:UserandcompanyDetails
  ) {
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
      this.DailyPrograms = (data['DailyPrograms'])
      this.TourPriceSum = Array.of(data['TourPriceSum']);

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


}
