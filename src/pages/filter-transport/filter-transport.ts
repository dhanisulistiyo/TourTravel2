import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListTransportPage} from '../list-transport/list-transport';
import {FiltransportService} from '../../providers/filtransport-service';
/*
  Generated class for the FilterTransport page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-transport',
  templateUrl: 'filter-transport.html'
})
export class FilterTransportPage {
  listRatings: Array<any>;
  listTypes: Array<any>;
  listSeats: Array<any>;
  inClass : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fil:FiltransportService) {
    this.inClass = true;
  }

   ionViewWillEnter() {
    console.log('ionViewDidLoad FilterTransportPage');
    this.listRating();
    this.listType();
    this.listSeat();
  }

  listType(){
      this.fil.listTransportTypes().subscribe(data=>{
            this.listTypes=data;
            console.log(this.listTypes);
            },err => {
                    console.log(err);
                },
                () => console.log('Types Search Complete')
            );
  }

  listRating(){
    this.fil.listTransportRatings().subscribe(data=>{
            this.listRatings=data;
            console.log(this.listRatings);
            },err => {
                    console.log(err);
                },
                () => console.log('Ratings Search Complete')
            );
  }


  listSeat(){
    this.fil.listSeatTypes().subscribe(data=>{
            this.listSeats=data;
            console.log(this.listSeats);
            },err => {
                    console.log(err);
                },
                () => console.log('Seats Search Complete')
            );

  }


  filterrating(rat){
    //var sumRat= this.listRatings.length;
  //  var i = 0;
  //   for (var i = 0; i < sumRat; i++) {
  //     if ((this.listRatings[i].Id) == rat) {
  //       console.log(this.listRatings[i].Id);
  //       (this.listRatings[i].Id).inClass = true;
  //     }
  //     else {
  //      (this.listRatings[i].Id).inClass = false;
  //       console.log("out");
  //     }
  //   }
  //   console.log((this.listRatings[0].Id).inClass);
  //   console.log(this.listRatings[1].inClass);
  //   console.log(this.listRatings[2].inClass);
  }

    listTapped(event) {
    this.navCtrl.pop();
    this.navCtrl.push(ListTransportPage);
    
  }

}
