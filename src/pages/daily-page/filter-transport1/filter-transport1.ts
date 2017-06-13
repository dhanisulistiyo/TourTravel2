import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FiltransportService} from '../../../providers/filtransport-service';
import { TransportService} from '../../../providers/transport-service';
import {ListTransportPage1 } from '../list-transport1/list-transport1';

/*
  Generated class for the FilterTransport2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-transport1',
  templateUrl: 'filter-transport1.html',
  providers:[FiltransportService]
})
export class FilterTransport1Page {
  listRatings: Array<any>;
  listTypes: Array<any>;
  listSeats: Array<any>;
  idAwal;
  idAkhir;
  des;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fil:FiltransportService,
   public tra: TransportService,
   public load : LoadingController
   ) {

    this.des = navParams.data['des']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.listRating();
    this.listType();
    this.listSeat();
    loader.dismiss();
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
    let des = this.des;
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(ListTransportPage1, {des, id, i});
    
  }


}
