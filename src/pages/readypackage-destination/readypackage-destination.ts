import { IteneraryReadyProvider } from './../../providers/itenerary-ready';
import { ReadyPackageProvider } from './../../providers/ready-package';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReadyPackagePage } from './../ready-package/ready-package';
import { LocationService } from './../../providers/location-service';

/**
 * Generated class for the ReadypackageDestinationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-readypackage-destination',
  templateUrl: 'readypackage-destination.html'
})
export class ReadypackageDestinationPage {

  listLocations: Array<any>;
  locations: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private locService: LocationService,
   public ready : ReadyPackageProvider,
   public itr : IteneraryReadyProvider
  ) {
  }

  ionViewWillEnter() {
    this.locService.searchAllLocation().subscribe(data => {
      this.listLocations = data;
      this.locations = this.listLocations;
    }, err => {
      console.log(err);
    },
      () => console.log('Destination Search Complete')
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadypackageDestinationPage');
  }

  listDestination() {
    this.locations = this.listLocations;
  }

  searchLocationDB(searchbar) {
    // Reset items back to all of the items
    this.locations;
    // set q to the value of the searchbar
    var q = searchbar.target.value;
    // if the value is an empty string don't filter the items
    if (q != undefined) {
      if (q.trim() == '') {
        this.listDestination();
        return;
      }
      this.listDestination();
      this.locations = this.locations.filter((v) => {

        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.Country.Name.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.Region.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      })

    } else this.listDestination();
  }

  setSelectedLocation(selectedItem) {
    console.log(selectedItem);
    this.ready.setDestination(selectedItem);
    this.itr.setDestination(selectedItem);
    this.navCtrl.push(ReadyPackagePage);
  }

}
