import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {ListHotelPage} from '../list-hotel/list-hotel';
import { FilacomodationService } from '../../providers/filacomodation-service';

/*
  Generated class for the FilterHotel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-hotel',
  templateUrl: 'filter-hotel.html'
})
export class FilterHotelPage {
  listRatings: Array<any>;
  listAreas: Array<any>;
  listLocations: Array<any>;
  listTypes: Array<any>;
  listFacilities: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fil: FilacomodationService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterHotelPage');
  }

  ionViewWillEnter() {
    this.listArea();
    this.listRating();
    this.listType();
    this.listFacility();
    this.listLocation();
  }


  listTapped(event) {
    this.navCtrl.pop();
  }






  listArea() {
    this.fil.listAcomodationAreas().subscribe(data => {
      this.listAreas = data;
      console.log(this.listAreas);
    }, err => {
      console.log(err);
    },
      () => console.log('Area Search Complete')
    );
  }


  listRating() {
    this.fil.listAcomodationRatings().subscribe(data => {
      this.listRatings = data;
      console.log(this.listRatings);
    }, err => {
      console.log(err);
    },
      () => console.log('Ratings Search Complete')
    );
  }


  listLocation() {
    this.fil.listAcomodationLocations().subscribe(data => {
      this.listLocations = data;
      console.log(this.listLocations);
    }, err => {
      console.log(err);
    },
      () => console.log('Location Search Complete')
    );
  }


  listType() {
    this.fil.listAcomodationTypes().subscribe(data => {
      this.listTypes = data;
      console.log(this.listTypes);
    }, err => {
      console.log(err);
    },
      () => console.log('Type Search Complete')
    );
  }

  listFacility() {
    this.fil.listAcomodationFacilities().subscribe(data => {
      this.listFacilities = data;
      console.log(this.listFacilities);
    }, err => {
      console.log(err);
    },
      () => console.log('Facility Search Complete')
    );
  }

}
