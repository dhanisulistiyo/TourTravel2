import { FixedpackageAllPage } from './../fixedpackage-all/fixedpackage-all';
import { Component, ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FixedpackageDetailsPage } from './../fixedpackage-details/fixedpackage-details';

@Component({
  selector: 'page-fixed-package',
  templateUrl: 'fixed-package.html'
})
export class FixedPackagePage {

  showToolbar: boolean = false;


  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams) {

  }
  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedPackagePage');
  }
  fixHoneymoon(){
    this.navCtrl.push(FixedpackageDetailsPage);
  }
  fixSeeAll(){
    this.navCtrl.push(FixedpackageAllPage);
  }


}
