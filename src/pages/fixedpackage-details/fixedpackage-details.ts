import { FixedPackageProvider } from './../../providers/fixed-package';
import { Component, ChangeDetectorRef , ViewChild} from '@angular/core';
import { NavController, NavParams, LoadingController, Slides } from 'ionic-angular';
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
  @ViewChild(Slides) slides: Slides;
  showToolbar: boolean = false;
  read;
  Prices;
  Images;
  Descriptions;
  BookingDetailSum;
  DailyPrograms;
  TourPriceSum;
  TourGuestSum;
  days
  newval
  
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams, 
    public fixService : FixedPackageProvider, public load: LoadingController) {
    this.read = false;
    this.newval= 0
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
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
      let start = ( +new Date(this.BookingDetailSum.StartDate))
      let end = (+new Date(this.BookingDetailSum.EndDate))
      this.days = Math.round((end - start) / 86400000);
      console.log( this.days)
      loader.dismiss();
      
    }, err => {
      console.log(err);
      loader.dismiss();

    },
      () => console.log('Hotel Search Complete')
    );
  }

  bookNow() {
    let res = this.BookingDetailSum
    this.navCtrl.push(FixedpackageGuestPage,{res})
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
