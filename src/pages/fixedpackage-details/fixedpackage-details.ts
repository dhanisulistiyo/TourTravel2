import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FixedpackageGuestPage } from './../fixedpackage-guest/fixedpackage-guest';

/**
 * Generated class for the FixedpackageDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-fixedpackage-details',
  templateUrl: 'fixedpackage-details.html',
})
export class FixedpackageDetailsPage {

  showToolbar: boolean = false;
  read;

  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams) {
    this.read = false;
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedpackageDetailsPage');
  }

  bookNow() {
    this.navCtrl.push(FixedpackageGuestPage)
  }

  toggleDetails(data) {
    if (data) {
      this.read = false;
    } else {
      this.read = true;
    }
  }


}
