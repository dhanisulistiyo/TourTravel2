import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FilacomodationService } from '../../../providers/filacomodation-service';
import { AcomodationService } from '../../../providers/acomodation-service';


import { ListHotelPage1 } from '../list-hotel1/list-hotel1';

@Component({
    selector: 'page-filter-hotel1',
    templateUrl: 'filter-hotel1.html',
    providers: [FilacomodationService]
})
export class FilterHotel1Page {

    listRatings: Array<any>;
    listAreas: Array<any>;
    listLocations: Array<any>;
    listTypes: Array<any>;
    listFacilities: Array<any>;
    active: boolean = false;

    selectedRat: Number[] = [];
    idAwal;
    idAkhir;
    des;
    constructor(public navCtrl: NavController, public navParams: NavParams, public fil: FilacomodationService,
        public aco: AcomodationService,
        public load: LoadingController) {
        this.des = navParams.data['des']
        this.idAwal = navParams.data['id']
        this.idAkhir = navParams.data['i']
    }

    ionViewWillEnter() {
        let loader = this.load.create({
            content: 'Please wait...'
        });
        loader.present();
        this.listRating();
        this.listArea();
        this.listLocation();
        this.listType();
        this.listFacility();
        loader.dismiss();
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
        this.fil.getAcomodationAreas(this.des).subscribe(data => {
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


    //   filterRat(ratings){
    //     console.log(ratings);
    //     this.aco.setRatings(ratings);

    //   }
    filterRat(ratings) {
        const foundAt = this.selectedRat.indexOf(ratings);
        if (foundAt >= 0) {
            this.selectedRat.splice(foundAt, 1);
            this.active = !this.active;

            console.log(this.active);
        } else {
            this.selectedRat.push(ratings);
        }
        console.log(this.selectedRat);
        this.aco.setRatings(this.selectedRat);
    }

    filterAr(areas) {
        console.log(areas);
        this.aco.setAreas(areas);
    }

    filterLoc(locations) {
        console.log(locations);
        this.aco.setLocations(locations);
    }

    filterType(types) {
        console.log(types);
        this.aco.setTypes(types);
    }

    filterFac(facilities) {
        console.log(facilities);
        this.aco.setFacilities(facilities);
    }

    listTapped(event) {
        this.navCtrl.pop();
        let des = this.des;
        let id = this.idAwal;
        let i = this.idAkhir;
        this.navCtrl.push(ListHotelPage1, { des, id, i });
    }
    buttonClick() {
        this.active = !this.active;
        console.log(this.active);
    }

}
