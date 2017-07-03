
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {DailyService} from '../../../providers/daily-service';


@Component({
  selector: 'page-transport-airportservice1',
  templateUrl: 'transport-airportservice1.html'
})
export class TransportAirportservice1Page {
   transportser:Array<any>;
   idAwal;
  idAkhir;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl:ViewController, public ds : DailyService) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
    this.transportser=navParams.data['ser']
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportAirportservicePage');
  }
  
  

  setTransService(itemser){
     let id = this.idAwal;
     let i = this.idAkhir;
     this.ds.setTransportService(id,i,itemser)
      this.navCtrl.pop().then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });
  }
}
