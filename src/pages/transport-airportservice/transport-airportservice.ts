import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//import {IteneraryBuilderPage} from '../itenerary-builder/itenerary-builder'
import {TransportLocationservice} from '../transport-locationservice/transport-locationservice'
import {DailyService} from '../../providers/daily-service';

@Component({
  selector: 'page-transport-airportservice',
  templateUrl: 'transport-airportservice.html'
})
export class TransportAirportservicePage {
   //transportser:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl:ViewController, public ds : DailyService) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportAirportservicePage');
  }

  // ionViewWillEnter() {
  //     let id = this.ite.getTransport();
  //     this.transportser=id.trans['TransportationItemServiceTypes'];
  //     console.log(this.transportser);
  // }
  // setTransService(itemser){
  //    var data = JSON.stringify({itemser});
  //    console.log(data);
  //    this.ite.setTransportSer(data);
  //    this.navCtrl.push(TransportLocationservice,{itemser} );
  // }


setTransService(itemser){
     this.ds.setTransportAirport(itemser);
     this.navCtrl.push(TransportLocationservice,{itemser});
  }


}
