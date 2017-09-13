import { TourDetailsPage } from './../tour-details/tour-details';
import { ConfigProvider } from './../../providers/config';
import { AcomodationService } from './../../providers/acomodation-service';
import { FixedPackageProvider } from './../../providers/fixed-package';
import { Component, ChangeDetectorRef , ViewChild} from '@angular/core';
import { NavController, NavParams, LoadingController, Slides, AlertController } from 'ionic-angular';
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
  Package
  read;
  Prices;
  Images;
  Description;
  Descriptions;
  BookingDetailSum;
  DailyPrograms;
  TourPriceSum;
  TourGuestSum;
  days
  id
  HotelId
  Hotel
  baseUrl

  //Tambahan
  TourDetails
  Movement
  data: Array<{Movements: any,Day:any, Date:any}> = [];
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams, 
  public fixService : FixedPackageProvider, public load: LoadingController, public aco: AcomodationService,
  public conf: ConfigProvider, public alertCtrl:AlertController
  ) {
    this.baseUrl =  this.conf.baseUrlImage;
    this.read = false;
    this.id = navParams.data["id"]
    this.HotelId = null;
    this.Hotel = null;
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
      this.Package = data 
      console.log(data)
      this.Prices = (data['Prices'])
      this.Images = (data['Images'])
      this.Description = (data['Description'])
      this.Descriptions = (data['Descriptions'])
      this.BookingDetailSum = (data['BookingDetailSum'])
      this.DailyPrograms = (data['DailyPrograms'])
      this.TourPriceSum = (data['TourPriceSum'])
      this.TourGuestSum = (data['TourGuestSum'])
      let start = ( +new Date(this.BookingDetailSum.StartDate))
      let end = (+new Date(this.BookingDetailSum.EndDate))
      this.days = Math.round((end - start) / 86400000);     
      //From Movement 
      this.TourDetails = [];
      for (let i = 0; i < (Object.keys(this.DailyPrograms).length); i++) {
        this.Movement= [];
        if(Object.keys(this.DailyPrograms[i].Movements).length != 0){
          this.Movement= this.DailyPrograms[i].Movements;
            this.Movement.sort(function(obj1, obj2) {
            if (obj1.SeqNumber > obj2.SeqNumber) {
              return 1;
          }
          if (obj1.SeqNumber < obj2.SeqNumber) {
              return -1;
          }
            return 0;
          })    
        }
          this.TourDetails.push(this.Movement);
          console.log(this.TourDetails)
      }
        for (let i = 0; i < (Object.keys(this.DailyPrograms).length); i++) {
          let check = this.DailyPrograms[i].TourDestinations;
          if(Object.keys(check).length != 0){
             for (let j = 0; j < (Object.keys(check).length); j++) {
                if(check[j].AccommodationSummary != null){
                  this.HotelId = check[j].AccommodationSummary.AccommodationProfileId;
                  break;
                }
            }
          }
        }
        if(this.HotelId != null) this.aco.searchAcomodation(this.HotelId).subscribe(data=>{this.Hotel= data;})
      
        //   console.log(this.Movement)
        //   if(Object.keys(check.RecreationMovement).length != 0) this.Movement = this.Movement.concat(check.RecreationMovement)
        //   console.log(this.Movement)
        //   if(Object.keys(check.TravelMovement).length != 0) this.Movement=this.Movement.concat(check.TravelMovement)
        //   console.log(this.Movement)   
        //   this.Movement.sort(function(obj1, obj2) {
        //     if (obj1.DateTime > obj2.DateTime) {
        //       return 1;
        //   }
        //   if (obj1.DateTime < obj2.DateTime) {
        //       return -1;
        //   }
        //     return 0;
        //   })
        //   this.TourDetails.push(this.Movement);
        // }
        // console.log(this.TourDetails)
    }, err => {
      console.log(err);
    },
      () => console.log('Fixed Search Complete')
    );
    loader.dismiss();
  }

  bookNow() {
    if(this.BookingDetailSum.FixedPackage.MaximumGuest <= this.BookingDetailSum.FixedPackage.RegisteringGuest) this.showAlertfull()
    else{
      let res = this.BookingDetailSum
      let pk = this.Package
      let price= this.Prices
      this.fixService.setId(this.BookingDetailSum.Id)
      this.navCtrl.push(FixedpackageGuestPage,{res, price, pk})
    }
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

  showDetails(i) {
    this.data=[];
    for (let i = 0; i < (Object.keys(this.DailyPrograms).length); i++) {
      this.data.push({
        Movements: this.TourDetails[i],
        Day: this.DailyPrograms[i].Day,
        Date: this.DailyPrograms[i].Date
      });
    }
    let dp = this.data
    //let dp = this.DailyPrograms
    this.navCtrl.push(FixedpackageItineraryPage, {dp});
  }

  showAlertfull() {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: 'This tour fully booked!',
      buttons: ['OK']
    });
    alert.present();
  }

}
