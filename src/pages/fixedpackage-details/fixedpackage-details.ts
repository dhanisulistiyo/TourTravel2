import { ConfigProvider } from './../../providers/config';
import { AcomodationService } from './../../providers/acomodation-service';
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
  id
  Hotel
  baseUrl
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams, 
  public fixService : FixedPackageProvider, public load: LoadingController, public aco: AcomodationService,
  public conf: ConfigProvider
  ) {
    this.baseUrl =  this.conf.baseUrlImage;
    this.read = false;
    this.id = navParams.data["id"]
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  ionViewWillEnter() {
    var id;
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.fixService.detailsPackage(this.id).subscribe(data => {
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
      this.id = this.DailyPrograms[0].TourDestinations[0].AccommodationSummary.AccommodationProfileId;
      this.aco.searchAcomodation(this.id).subscribe(data => {
        this.Hotel =  data;
        console.log(data);
    
        }, err => {
          console.log(err);
        },
          () => console.log('Hotel Search Complete')
        );
    }, err => {
      console.log(err);
    },
      () => console.log('Fixed Search Complete')
    );
    loader.dismiss();
  }

  bookNow() {
    let res = this.BookingDetailSum
    let price= this.Prices
    this.fixService.setId(this.BookingDetailSum.Id)
    this.navCtrl.push(FixedpackageGuestPage,{res, price})
  }

  getNumber(n){
    return new Array(Number(n));
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
