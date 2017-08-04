import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AttractionDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attraction-details',
  templateUrl: 'attraction-details.html',
})
export class AttractionDetailsPage {
  showToolbar: boolean = false;
  read;
  attrac;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef) {
    this.read = false;
    this.attrac = this.navParams.data["attrac"]
  }

    toggleDetails(data) {
    if (data) {
      this.read = false;
    } else {
     this.read = true;
    }
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttractionDetailsPage');
  }

}
