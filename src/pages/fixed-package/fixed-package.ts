import { FixedPackageProvider } from './../../providers/fixed-package';
import { FixedpackageAllPage } from './../fixedpackage-all/fixedpackage-all';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FixedpackageDetailsPage } from './../fixedpackage-details/fixedpackage-details';

@Component({
  selector: 'page-fixed-package',
  templateUrl: 'fixed-package.html'
})
export class FixedPackagePage {

  showToolbar: boolean = false;
  listFixedPackage: Array<any>;

  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams, private fixService: FixedPackageProvider) {

  }
  ionViewWillEnter() {
    this.fixService.showFixedPackage().subscribe(data => {
      this.listFixedPackage = data;
      console.log(data)
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
  fixHoneymoon() {
    this.navCtrl.push(FixedpackageDetailsPage);
  }
  fixSeeAll() {
    this.navCtrl.push(FixedpackageAllPage);
  }


}
