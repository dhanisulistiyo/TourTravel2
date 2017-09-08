import { FixedPackageProvider } from './../../providers/fixed-package';
import { FixedpackageAllPage } from './../fixedpackage-all/fixedpackage-all';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FixedpackageDetailsPage } from './../fixedpackage-details/fixedpackage-details';

@Component({
  selector: 'page-fixed-package',
  templateUrl: 'fixed-package.html'
})
export class FixedPackagePage {

  showToolbar: boolean = false;
  listFixedH: Array<any>;
  listFixedR: Array<any>;
  listFixedB: Array<any>;
  listFixedF: Array<any>;
  StartDate
  EndDate
  days

  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams, private fixService: FixedPackageProvider, public load:LoadingController) {
    this.listFixedH = [];
    this.listFixedR = [];
    this.listFixedB = [];
    this.listFixedF = [];
  }
  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();

    this.fixService.showFixedPackageByFilter('Honeymoon').subscribe(data => {
      this.listFixedH = data;
      console.log(data)

    }, err => {
      console.log(err);
    }, () => console.log("Fix Package Search Complete")
    );


    this.fixService.showFixedPackageByFilter('Regular').subscribe(data => {
      this.listFixedR = data;
      console.log(data)
      
    }, err => {
      console.log(err);
    }, () => console.log("Fix Package Search Complete")
    );

    this.fixService.showFixedPackageByFilter('Business').subscribe(data => {
      this.listFixedB= data;
      console.log(data)
      
    }, err => {
      console.log(err);
    }, () => console.log("Fix Package Search Complete")
    );

    this.fixService.showFixedPackageByFilter('Family').subscribe(data => {
      this.listFixedF = data;
      console.log(data)
      
    }, err => {
      console.log(err);
    }, () => console.log("Fix Package Search Complete")
    );

    loader.dismiss();



  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedPackagePage');
  }
  detailTour(id) {
    this.navCtrl.push(FixedpackageDetailsPage, {id});
  }
  fixSeeAll(type) {
    this.navCtrl.push(FixedpackageAllPage,{type});
  }


}
