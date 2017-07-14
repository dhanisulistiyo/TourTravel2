import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DailyService} from '../../../providers/daily-service';
import {TransportHoursPage} from '../transport-hours/transport-hours';


@Component({
  selector: 'page-transport-airportservice1',
  templateUrl: 'transport-airportservice1.html'
})
export class TransportAirportservice1Page {
   transportser:Array<any>;
   idAwal;
   idAkhir;
  constructor(public navCtrl: NavController, public navParams: NavParams , public ds : DailyService) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
    this.transportser=navParams.data['ser']
    console.log(this.transportser)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportAirportservicePage');
  }
  
  

  setTransService(itemser){
     let id = this.idAwal;
     let i = this.idAkhir;
     let ho = itemser.Hours
     console.log(ho)
     this.ds.setTransportService(id,i,itemser.ServiceType)
     this.navCtrl.push(TransportHoursPage,{id,i,ho});
  }
}
