import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryService} from '../../providers/history-service';
import {TourDetailsPage } from '../tour-details/tour-details';
/*
  Generated class for the MybookingOn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mybooking-on',
  templateUrl: 'mybooking-on.html'
})
export class MybookingOnPage {

  HistoryBookingOpen: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public his: HistoryService) {
    this.HistoryBookingOpen= null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookingOnPage');
  }

  ionViewWillEnter() {
    this.his.getHistoryTransactions().subscribe(data=>{
            this.HistoryBookingOpen= data;
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
