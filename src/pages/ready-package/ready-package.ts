import { DestinationTransportPage } from './../destination-transport/destination-transport';
import { IteneraryReadyProvider } from './../../providers/itenerary-ready';
import { ItineraryReadyPage } from './../itinerary-ready/itinerary-ready';
import { ReadyPackageProvider } from './../../providers/ready-package';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ReadypackageDetailsPage } from './../readypackage-details/readypackage-details';
import { IteneraryBuilderPage } from './../itenerary-builder/itenerary-builder';

/**
 * Generated class for the ReadyPackagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-ready-package',
  templateUrl: 'ready-package.html',
})
export class ReadyPackagePage {
  listReadyPackage:Array<any>;
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, 
    public navParams: NavParams, public load: LoadingController, 
    public ready: ReadyPackageProvider, public itr: IteneraryReadyProvider) {
      this.listReadyPackage = [];
      let loader = this.load.create({
        content: 'Please wait...'
      });
      loader.present();
      this.ready.showReadyPackagebyFilter().subscribe(data => {
        this.listReadyPackage = data;
        console.log(data)
        loader.dismiss()
      }, err => {
        console.log(err);
        loader.dismiss()
      }, () => console.log("Hello Ready Package")
    );
  }

  customPackage(){
    this.navCtrl.push(IteneraryBuilderPage);
  }

  pickPackage(id){
    this.itr.getDetailsTour(id);
    this.navCtrl.push(ItineraryReadyPage);
  }

  showDetails(id){
    this.itr.getDetailsTour(id);
    this.navCtrl.push(ReadypackageDetailsPage,{id});
  }

}
