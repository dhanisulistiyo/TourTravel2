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
  listFixedHoneymoon: Array<any>;
  StartDate
  EndDate
  days

  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams, private fixService: FixedPackageProvider, public load:LoadingController) {

  }
  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.fixService.showFixedPackageByFilter('Honeymoon').subscribe(data => {
      this.listFixedHoneymoon = data;
      console.log(data)
      loader.dismiss()

    }, err => {
      console.log(err);
    }, () => console.log("Fix Package Search Complete")
    );
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
