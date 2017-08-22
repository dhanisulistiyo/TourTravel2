import { FixedPackageProvider } from './../../providers/fixed-package';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FixedpackageGuestPage } from './../fixedpackage-guest/fixedpackage-guest';
import { FixedpackageItineraryPage } from './../fixedpackage-itinerary/fixedpackage-itinerary';

/**
 * Generated class for the FixedpackageDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fixedpackage-details',
  templateUrl: 'fixedpackage-details.html',
})
export class FixedpackageDetailsPage {

  showToolbar: boolean = false;
  read;
  Prices;
  Images;
  Descriptions;
  BookingDetailSum;
  DailyPrograms;
  TourPriceSum;
  TourGuestSum;
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams, 
    public fixService : FixedPackageProvider, public load: LoadingController) {
    this.read = false;
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.fixService.detailsPackage(1).subscribe(data => {
      console.log(data)
      this.Prices = (data['Prices'])
      this.Images = (data['Images'])
      this.Descriptions = (data['Descriptions'])
      this.BookingDetailSum = (data['BookingDetailSum'])
      this.DailyPrograms = (data['DailyPrograms'])
      this.TourPriceSum = (data['TourPriceSum'])
      this.TourGuestSum = (data['TourGuestSum'])
      loader.dismiss();
      

    }, err => {
      console.log(err);
      loader.dismiss();

    },
      () => console.log('Hotel Search Complete')
    );
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

  showDetails(dp, day, date) {
    this.navCtrl.push(FixedpackageItineraryPage, {dp, day, date});
  }


}
