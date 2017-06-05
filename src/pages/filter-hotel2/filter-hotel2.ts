import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FilacomodationService} from '../../providers/filacomodation-service';
import {AcomodationService} from '../../providers/acomodation-service';


import { ListHotelPage } from '../list-hotel/list-hotel';
/*
  Generated class for the FilterHotel2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-hotel2',
  templateUrl: 'filter-hotel2.html',
  providers:[FilacomodationService]
})
export class FilterHotel2Page {

  listRatings: Array<any>;
  listAreas: Array<any>;
  listLocations: Array<any>;
  listTypes: Array<any>;
  listFacilities: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams , public fil:FilacomodationService, public aco: AcomodationService) {}

  ionViewWillEnter() {
        this.listRating();
        this.listArea();
        this.listLocation();
        this.listType();
        this.listFacility();
  }

    listRating() {
        this.fil.listAcomodationRatings().subscribe(data => {
            this.listRatings = (data);
            console.log(this.listRatings);
        }, err => {
            console.log(err);
        },
            () => console.log('Ratings Search Complete')
        );
    }


    listArea() {
        this.fil.listAcomodationAreas().subscribe(data => {
            this.listAreas = (data);
            console.log(this.listAreas);
        }, err => {
            console.log(err);
        },
            () => console.log('Area Search Complete')
        );
    }


    listLocation() {
        this.fil.listAcomodationLocations().subscribe(data => {
            this.listLocations = (data);
            console.log(this.listLocations);
        }, err => {
            console.log(err);
        },
            () => console.log('Location Search Complete')
        );
    }


    listType() {
        this.fil.listAcomodationTypes().subscribe(data => {
            this.listTypes = (data);
            console.log(this.listTypes);
        }, err => {
            console.log(err);
        },
            () => console.log('Type Search Complete')
        );
    }

    listFacility() {
        this.fil.listAcomodationFacilities().subscribe(data => {
            this.listFacilities = (data);
            console.log(this.listFacilities);
        }, err => {
            console.log(err);
        },
            () => console.log('Facility Search Complete')
        );
    }


  filterRat(ratings){
    console.log(ratings);
    this.aco.setRatings(ratings);

  }

  filterAr(areas){
    console.log(areas);
    this.aco.setAreas(areas);
  }

  filterLoc(locations){
    console.log(locations);
    this.aco.setLocations(locations);
  }

  filterType(types){
    console.log(types);
    this.aco.setTypes(types);
  }

  filterFac(facilities){
    console.log(facilities);
    this.aco.setFacilities(facilities);
  }

  listTapped(event) {
    this.navCtrl.pop();
    this.navCtrl.push(ListHotelPage);
  }

}
