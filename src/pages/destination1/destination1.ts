import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocationService} from '../../providers/location-service';
import {IteneraryService} from '../../providers/itenerary-service';
//import { IteneraryBuilderPage } from '../itenerary-builder/itenerary-builder';
@Component({
  selector: 'page-destination1',
  templateUrl: 'destination1.html',
  providers: [LocationService, IteneraryService]
})
export class DestinationPage1 {
  //locations : Array< {Id: string, Name: string, ImageUrl: string, Country: string}>;
  listLocations : Array<any>;
  locations : Array<any>;
  //locationItem :LocationPopoverComponent;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private locService: LocationService, 
  private ite: IteneraryService
  ) {

  }


   ionViewWillEnter() {
    this.locService.searchAllLocation().subscribe(data => {
      this.listLocations = data;
      this.locations = this.listLocations;
    }, err => {
      console.log(err);
    },
      () => console.log('Hotel Search Complete')
    );
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

        }else this.listDestination();
    }


 

    setSelectedLocation(selectedItem) {
     console.log(selectedItem);
     this.ite.setDestination(selectedItem.Id);
     this.ite.setObjectLocation(JSON.stringify(selectedItem));
     this.navCtrl.pop();
     //this.navCtrl.push(IteneraryBuilderPage);
  }

}
