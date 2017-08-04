import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HistoryService} from '../../providers/history-service';
import {TourDetailsPage } from '../tour-details/tour-details';

/**
 * Generated class for the MybookingCancel page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mybooking-cancel',
  templateUrl: 'mybooking-cancel.html',
})
export class MybookingCancel {
HistoryBookingCancel: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public his: HistoryService, public load: LoadingController) {
  }


ionViewWillEnter() {
  let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.his.getHistoryTransactionsCancel().subscribe(data=>{          
            this.HistoryBookingCancel= data;
            console.log(data)
            loader.dismiss();
            },err => {
                    console.log(err);
                    loader.dismiss();
                },
                () => console.log('Get History Transaction Complete')
            );
  }

   detailTourTapped(event, id){
    this.navCtrl.push(TourDetailsPage, id);
  }

}
