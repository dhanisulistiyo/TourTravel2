import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FiltransportService} from '../../providers/filtransport-service';
import { TransportService} from '../../providers/transport-service';

import { ListTransportPage} from '../list-transport/list-transport';

/*
  Generated class for the FilterTransport2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-transport2',
  templateUrl: 'filter-transport2.html',
  providers:[FiltransportService]
})
export class FilterTransport2Page {
  listRatings: Array<any>;
  listTypes: Array<any>;
  listSeats: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fil:FiltransportService, public tra: TransportService) {}

  ionViewWillEnter() {
    this.listRating();
    this.listType();
    this.listSeat();
  }

  public listType(){
      this.fil.listTransportTypes().subscribe(data=>{
            this.listTypes=data;
            console.log(this.listTypes);
            
            },err => {
                    console.log(err);
                },
                () => console.log('Types Search Complete')
            );
  }

  public listRating(){
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




  filterRat(ratings){
    console.log(ratings);
    this.tra.setRatings(ratings);

  }

  filterType(types){
    console.log(types);
    this.tra.setTypes(types);
  }

  filterSeats(seat){
    console.log(seat);
    this.tra.setSeats(seat);
  }


 listTapped(event) {
    this.navCtrl.pop();
    this.navCtrl.push(ListTransportPage);
    
  }


}
