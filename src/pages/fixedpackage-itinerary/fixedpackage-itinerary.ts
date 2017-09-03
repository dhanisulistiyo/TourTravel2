import { DailyService } from './../../providers/daily-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FixedpackageItineraryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fixedpackage-itinerary',
  templateUrl: 'fixedpackage-itinerary.html',
})
export class FixedpackageItineraryPage {
  DP
  Day 
  Dates
  // Movement: Array<any>;
  // TourDetails: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.DP = navParams.data['dp']
    this.Day =  navParams.data['day']
    this.Dates =  navParams.data['date']
  }
  

  ionViewWillEnter(){
    console.log('ionViewDidLoad FixedpackageItineraryPage');
  //   this.TourDetails= [];
  //   console.log(this.DP)
  //   for (let i = 0; i < (Object.keys(this.DP).length); i++) {
  //     this.Movement= [];
  //     let check = this.DP[i].MovementSummary;
  //     if(Object.keys(check.AccommodationMovements).length != 0) this.Movement = this.Movement.concat(check.AccommodationMovements)
  //     console.log(this.Movement)
  //     if(Object.keys(check.RecreationMovement).length != 0) this.Movement = this.Movement.concat(check.RecreationMovement)
  //     console.log(this.Movement)
  //     if(Object.keys(check.TravelMovement).length != 0) this.Movement=this.Movement.concat(check.TravelMovement)
  //     console.log(this.Movement)   
  //     this.Movement.sort(function(obj1, obj2) {
  //       if (obj1.DateTime > obj2.DateTime) {
  //         return 1;
  //     }
  //     if (obj1.DateTime < obj2.DateTime) {
  //         return -1;
  //     }
  //       return 0;
  //     })
  //     this.TourDetails.push(this.Movement);
  //   }
  //   console.log(this.TourDetails)
     }

}
