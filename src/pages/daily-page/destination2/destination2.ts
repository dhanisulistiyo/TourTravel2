
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocationService} from '../../../providers/location-service';
import {DailyService} from '../../../providers/daily-service';


@Component({
  selector: 'page-destination2',
  templateUrl: 'destination2.html',
  providers: [LocationService]
})
export class DestinationPage2 {
  listLocations : Array<any>;
  locations : Array<any>;
  idAwal;
  idAkhir;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private locService: LocationService, 
  public ds : DailyService  
  ) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }


  ionViewDidLoad() {
    console.log(this.idAwal);
    console.log(this.idAkhir);
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

            this.locations = this.locations.filter((v) => {

            if (v.Id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        })

        }else this.listDestination();
    }



 

    setSelectedLocation(selectedItem) {
     console.log(selectedItem);
     this.ds.setLocation(this.idAwal, this.idAkhir, selectedItem);
     this.navCtrl.pop();

  }

}
