import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FixedpackageGuestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-fixedpackage-guest',
  templateUrl: 'fixedpackage-guest.html',
})
export class FixedpackageGuestPage {
  showToolbar: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef) {
  }
  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedpackageGuestPage');
  }

}
