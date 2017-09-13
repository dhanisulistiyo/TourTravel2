import { ConfigProvider } from './../../providers/config';
import { AcomodationService } from './../../providers/acomodation-service';
import { ReadyPackageProvider } from './../../providers/ready-package';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ReadypackageDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-readypackage-details',
  templateUrl: 'readypackage-details.html',
})
export class ReadypackageDetailsPage {

  showToolbar: boolean = false;
  read;
  id;;
  Package
  Prices;
  Images;
  Description;
  Descriptions;
  BookingDetailSum;
  DailyPrograms;
  TourPriceSum;
  TourGuestSum;
  days;
  TourDetails;
  Movement;
  Hotel;
  HotelId;
  baseUrl;
  data: Array<{Movements: any,Day:any, Date:any}> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public ref: ChangeDetectorRef, public load: LoadingController, 
    public readyService: ReadyPackageProvider, public aco: AcomodationService, public conf: ConfigProvider) {
  this.id = navParams.data["id"];
  this.baseUrl =  this.conf.baseUrlImage;
  this.Hotel = null;
  this.HotelId = null;
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.readyService.detailsPackage(this.id).subscribe(data => {
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
    

        this.data=[];
        for (let i = 0; i < (Object.keys(this.DailyPrograms).length); i++) {
          this.data.push({
            Movements: this.TourDetails[i],
            Day: this.DailyPrograms[i].Day,
            Date: this.DailyPrograms[i].Date
          });
        }
    }, err => {
      console.log(err);
    },
      () => console.log('Fixed Search Complete')
    );
    loader.dismiss();
  }
  
  getNumber(n){
    return new Array(Number(n));
  }
  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  toggleDetails(data) {
    if (data) {
      this.read = false;
    } else {
      this.read = true;
    }
  }

}
