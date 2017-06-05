import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//import {IteneraryBuilderPage} from '../itenerary-builder/itenerary-builder'
import {IteneraryService} from '../../providers/itenerary-service';

@Component({
  selector: 'page-transport-airportservice',
  templateUrl: 'transport-airportservice.html',
  providers: [IteneraryService]
})
export class TransportAirportservicePage {
   transportser:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl:ViewController, public ite : IteneraryService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportAirportservicePage');
  }

  ionViewWillEnter() {
      let id = this.ite.getTransport();
      this.transportser=id.trans['TransportationItemServiceTypes'];
      console.log(this.transportser);
  }
  setTransService(itemser){
     var data = JSON.stringify({itemser});
     console.log(data);
     this.ite.setTransportSer(data);
      this.navCtrl.pop().then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });
  }
}
