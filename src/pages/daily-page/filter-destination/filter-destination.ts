
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocationService} from '../../../providers/location-service';
import {DailyService} from '../../../providers/daily-service';


@Component({
  selector: 'page-filter-destination',
  templateUrl: 'filter-destination.html',
  providers: [LocationService]
})
export class FilterDestinationPage {
  listLocations: Array<any>;
  locations: Array<any>;
  idAwal;
  idAkhir;
  details;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private locService: LocationService, 
  public ds : DailyService  
  ) {
    this.details = navParams.data['details']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }


  ionViewDidLoad() {
    console.log(this.idAwal);
    console.log(this.idAkhir);
    console.log(this.details)
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
      if (this.details == 0){   
          this.ds.setDestinationFrom(this.idAwal, this.idAkhir, selectedItem);
      }else{
          this.ds.setDestinationTo(this.idAwal, this.idAkhir, selectedItem);
      }
     this.navCtrl.pop();

  }

}
