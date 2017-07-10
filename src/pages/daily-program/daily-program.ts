import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DailyService } from '../../providers/daily-service'
import { IteneraryService } from '../../providers/itenerary-service'
import { MultiTransactionService } from '../../providers/multi-transaction-service'
import { ConfirmBookingPage } from '../confirm-booking/confirm-booking';
import { DailyDetails  } from '../daily-details/daily-details';

/**
 * Generated class for the DailyProgram page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-program',
  templateUrl: 'daily-program.html',
})
export class DailyProgram {
  data: Array<{id:any; dailyProgram: any, icon: string, showDetails: boolean }> = [];
   toursname;
   guest;
   event;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ds: DailyService, 
  public mt :MultiTransactionService,
  public it : IteneraryService
  ) {
    var pt = this.it.getPassenger();
    this.toursname = this.it.getToursName();
    this.guest = Number(pt.guestTour['AdultQty'])+ Number(pt.guestTour['ChildQty'])+ Number(pt.guestTour['InfantQty']);
    this.event = this.it.getDateTour().ev; 
  }

  ionViewWillEnter() {
    console.log(this.ds.daily);
    var no = Object.keys(this.ds.daily).length;
    var no1 = Object.keys(this.data).length;
    if(no1 != no ){
     for (let i = 0; i < no; i++) {
      this.data.push({
        id: i,
        dailyProgram: this.ds.daily[i],
        icon: 'ios-arrow-dropright-outline',
        showDetails: false
      });
    }
    }
    console.log(this.data);
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

  Details(event, i, date) {
    let item = this.ds.getDetails(i);
    //this.mt.destroyObject();
    this.navCtrl.push(DailyDetails ,{awal : i,item:item, date:date} )
}


  createSummary(event) {
    //this.ds.destroyObject();
    this.navCtrl.push(ConfirmBookingPage);
  }
}