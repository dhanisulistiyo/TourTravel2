import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryService} from '../../providers/history-service';
import {TourDetailsPage } from '../tour-details/tour-details';
/*
  Generated class for the MybookingCom page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mybooking-com',
  templateUrl: 'mybooking-com.html'
})
export class MybookingComPage {
HistoryBookingConfirm: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public his: HistoryService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookingComPage');
  }

  ionViewWillEnter() {
    this.his.getHistoryTransactionsConfirm().subscribe(data=>{
            this.HistoryBookingConfirm= data;
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
