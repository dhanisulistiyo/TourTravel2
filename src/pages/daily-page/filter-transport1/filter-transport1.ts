import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FiltransportService} from '../../../providers/filtransport-service';
import { DailyService } from '../../../providers/daily-service';
import { TransportService} from '../../../providers/transport-service';
import {ListTransportPage1 } from '../list-transport1/list-transport1';
import {FilterDestinationPage } from '../filter-destination/filter-destination';
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
   selectedRat:string[] = [];
  idAwal;
  idAkhir;
  daily;
    active1: boolean = true;
    active2: boolean = true;
    active3: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fil:FiltransportService,
   public tra: TransportService,
   public load : LoadingController,
   public ds : DailyService
   ) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });

    loader.present();
    this.daily = this.ds.daily[this.idAwal].program_daily[this.idAkhir];
    console.log(this.daily);
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
    const foundAt = this.selectedRat.indexOf(ratings);
        if (foundAt >= 0) {
            this.selectedRat.splice(foundAt, 1);
              switch (ratings) { 
                case 'REGULER': 
                    this.active1 = true;
                    break;
                case 'PREMIUM': 
                    this.active2 = true;
                    break;
                case 'LUXURY': 
                    this.active3 = true;
                    break;
              }
        } else {
            this.selectedRat.push(ratings);
               switch (ratings) { 
                case 'REGULER': 
                    this.active1 = false;
                    break;
                case 'PREMIUM': 
                    this.active2 = false;
                    break;
                case 'LUXURY': 
                    this.active3 = false;
                    break;
              }
        }
        console.log(this.selectedRat);
    this.tra.setRatings(this.selectedRat);

  }

  filterType(types){
    console.log(types);
    this.tra.setTypes(types);
  }

  filterSeats(seat){
    console.log(seat);
    this.tra.setSeats(seat);
  }

  filterDestination(details){
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(FilterDestinationPage, { details,id, i});

  }

 listTapped(event) {
    this.navCtrl.pop();

    let id = this.idAwal;
    let i = this.idAkhir;
    let from =this.ds.daily[id].program_daily[i].destinationFrom;
    let to = this.ds.daily[id].program_daily[i].destinationTo;
    this.navCtrl.push(ListTransportPage1, {from, to, id, i});
    
  }


}
