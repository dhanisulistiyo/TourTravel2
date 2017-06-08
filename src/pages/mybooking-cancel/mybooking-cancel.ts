import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public his: HistoryService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookingCancel');
  }

ionViewWillEnter() {
    this.his.getHistoryTransactionsCancel().subscribe(data=>{
            this.HistoryBookingCancel= data;
            },err => {
                    console.log(err);
                },
                () => console.log('Get History Transaction Complete')
            );
  }

   detailTourTapped(event, id){
    this.navCtrl.push(TourDetailsPage, id);
  }

}
