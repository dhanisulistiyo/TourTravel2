import { HomeScreenPage } from './../home-screen/home-screen';
import { Component, NgModule } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController, Platform, ViewController, ModalController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { MultiTransactionService } from '../../providers/multi-transaction-service';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';
import { CustomePackagePage } from '../custome-package/custome-package';

@Component({
  selector: 'page-confirm-booking',
  templateUrl: 'confirm-booking.html'
})
export class ConfirmBookingPage {
  data: Array<{ info: any, icon: string, showDetails: boolean }> = [];
  BookingDetailSum: Array<any>;
  DailyPrograms: Array<any>;
  TourPriceSum: Array<any>;
  TourGuest: Array<any>;
  curency;
  userinfo;
  dateEx;
  dateNow;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public mulTra: MultiTransactionService,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public info: UserandcompanyDetails,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    this.BookingDetailSum = null;
    this.DailyPrograms = null;
    this.TourPriceSum = null;
    this.curency = null;
    this.TourGuest = null;
  }

  openModal() {
    let allow = null;
    let modal = this.modalCtrl.create(ModalContentPage, { data: allow });
    modal.onDidDismiss(data => {
      this.bookingTour(data);
    });
    modal.present();
    //this.navCtrl.push(ModalController);
  }

    openModalExpired() {
    let allow = null;
    let modal = this.modalCtrl.create(ModalContentPageExpired, { data: allow });
    modal.onDidDismiss(data => {
      this.bookingTour(data);
    });
    modal.present();
    //this.navCtrl.push(ModalController);
  }

  bookingTour(sta) {
    let loader = this.load.create({
      content: 'Please wait...'
    
    });
    loader.present();
    if(sta!=null){
    this.mulTra.getTourTransaksi().subscribe(data => {
      this.BookingDetailSum = Array.of(data['BookingDetailSum']);
      if (sta == "yes") {
        let status = "Confirm"
        let details = this.BookingDetailSum;
         setTimeout(() => {
                    this.navCtrl.push(PaymentPage, { details, status });
                    loader.dismiss();
                }, 1500);
       
      } else {
        loader.dismiss();
        this.presentToast();
        this.navCtrl.setRoot(HomeScreenPage);

      }
    }, err => {
       loader.dismiss();
      console.log(err);
    }, () => console.log('post Transaction Complete'));
    }
  }

  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();

    this.info.getUser().subscribe(data => {
      this.userinfo = data;
    }, err => {
      console.log(err);
      //loader.dismiss();
    },
      () => console.log('Get Transaction Complete')
    );

    this.mulTra.mulDemoTransaction().subscribe(data => {
      this.BookingDetailSum = Array.of(data['BookingDetailSum']);
      this.TourGuest = (data['TourGuestSum']);
      this.DailyPrograms = (data['DailyPrograms'])
      this.TourPriceSum = Array.of(data['TourPriceSum']);

      this.dateEx = new Date(this.BookingDetailSum[0].ExpiredOn);
      this.dateNow = new Date();

      this.data.push({
        info: "Tour Detail",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

      this.data.push({
        info: "Guest Detail",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

      this.data.push({
        info: "Room Allocation",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

      this.data.push({
        info: "Tour Prices",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });

      this.data.push({
        info: "Tour Schedules",
        icon: 'ios-arrow-dropright-outline',
        showDetails: true
      });


      loader.dismiss();
    }, err => {
      console.log(err);
      let error = JSON.parse(err._body);
      this.showAlertError(error.Message)
      this.navCtrl.pop();
      loader.dismiss();
    },
      () => console.log('Get Transaction Complete')
    );


  }
  confirmTapped(event) {
    this.allertConfirmBooking();
  }
  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-arrow-dropright-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-arrow-dropdown-outline';
    }
  }

  allertConfirmBooking() {
    let today = (+new Date());
    let exp =  (+new Date(this.BookingDetailSum[0].ExpiredOn))
    let totalDays = (exp - today) / 86400000;
    let details = this.BookingDetailSum;
    let status = "confirm"
    let prompt = this.alertCtrl.create({
      title: 'Confirm Booking',
      message: "Do you agree with this booking?",
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Saved clicked');
            //this.navCtrl.push(PaymentPage, { details, status });
            if(totalDays > 3) this.openModal();
            else this.openModalExpired();
            // if(this.dateNow >= this.dateEx){
            //    prompt.dismiss().then(() => {
            //     this.allertExpireDate();
            //    }); 
            // }else{
            //    this.allertNoExpireDate();
            //    prompt.dismiss();
            // }       
            //this.alertSuccess();         
          }
        }
      ]
    });
    //prompt.fireOtherLifecycles = true;
    prompt.present();
  }

  showAlertError(err) {
    let alert = this.alertCtrl.create({
      title: 'Failed!',
      subTitle: err,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Your Booking has been saved in Sistem, Please check in History',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  // allertExpireDate(){
  //   let detail = this.BookingDetailSum;
  //   let status= "confirm"
  //   let prompt = this.alertCtrl.create({
  //     title: 'Booking Expired',
  //     message: "Do you want to pay this booking?",
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: ()=> {
  //           console.log('Cancel clicked');
  //           prompt.dismiss();
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: () => {
  //           console.log('Save clicked');

  //           let loader = this.load.create({
  //             content: 'Please wait...'
  //           });
  //           loader.present();
  //           this.mulTra.getTourTransaksi().subscribe(data => { console.log(data); }, err => { console.log(err); }, () => console.log('post Transaction Complete'));
  //           loader.dismiss();
  //           this.navCtrl.push(PaymentPage,{detail, status});
  //            }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }


  //  allertNoExpireDate(){
  //   let detail = this.BookingDetailSum;
  //   let status = "confirm";

  //   let prompt = this.alertCtrl.create({
  //     title: 'Pay Booking ',
  //     message: "Do you want to pay this booking now?",
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: ()=> {

  //           console.log('Cancel clicked');
  //           let loader = this.load.create({
  //             content: 'Please wait...'
  //           });
  //           loader.present();
  //           this.mulTra.getTourTransaksi().subscribe(data => { console.log(data); }, err => { console.log(err); }, () => console.log('post Transaction Complete'));
  //           loader.dismiss();
  //           this.presentToast();
  //           this.navCtrl.setRoot(CustomePackagePage);
  //           return false;
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: () => {

  //           console.log('Sukses clicked');
  //           let loader = this.load.create({
  //             content: 'Please wait...'
  //           });
  //           loader.present();
  //           this.mulTra.getTourTransaksi().subscribe(data => { console.log(data); }, err => { console.log(err); }, () => console.log('post Transaction Complete'));
  //           loader.dismiss();

  //           this.navCtrl.push(PaymentPage,{detail, status});

  //            }
  //       }
  //     ]
  //   });   
  //   prompt.present();
  // }

}



@Component({
  selector: 'page-confirm-booking',
  template: `
  
<ion-content class="popup-modal" style="border: 1px solid gray;">
<h2>Payment Options</h2>
<h3>Thank you for your booking!</h3>
<p>A confirmation email has been sent to your email address.</p>
<p>Do you want to <strong>Pay Now</strong> or <strong>Pay Later</strong>?</p>
<p style="margin-bottom: 35px;">Please note that if you choose <strong>Pay Later</strong>, your booking must be paid before the expiry date.</p>
  <ion-row>
    <ion-col>
      <button ion-button style="margin-top: 0px;margin-bottom: 0px;" full class="btn-cancel" (click)="dismiss()">No, Pay Later</button>
    </ion-col>
    <ion-col>
      <button ion-button style="margin-top: 0px;margin-bottom: 0px;" full class="btn-accept" (click)="payNow()">Yes, Pay Now</button>
    </ion-col>
  </ion-row>
  </ion-content>
`
})
export class ModalContentPage {
  BookingDetailSum;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public mulTra: MultiTransactionService,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public navCtrl: NavController
  ) {

  }


  payNow() {
    this.viewCtrl.dismiss("yes");
    // let details = this.BookingDetailSum;
    // console.log(details);
    // this.navCtrl.push(PaymentPage, { details, status });
  }

  dismiss() {
    this.viewCtrl.dismiss("no");
    //  this.navCtrl.setRoot(HomeScreenPage);
  }
}




@Component({
  selector: 'page-confirm-booking',
  template: `
  
<ion-content class="popup-modal1" style="border: 1px solid gray;">
<h2>Booking Expired</h2>
<h3>Thank you for your booking!</h3>
<p>A confirmation email has been sent to your email address.</p>
<p>Unfortunately, this booking is in grace period, you have to <strong>Pay Now</strong>.</p>
<p style="margin-bottom: 35px;">Do you want to proceed?</p>
  <ion-row>
    <ion-col>
      <button ion-button style="margin-top: 0px;margin-bottom: 0px;" full class="btn-cancel" (click)="dismiss()">No, I'll change the date</button>
    </ion-col>
    <ion-col>
      <button ion-button style="margin-top: 0px;margin-bottom: 0px;" full class="btn-accept" (click)="payNow()">Yes, Pay Now</button>
    </ion-col>
  </ion-row>
  </ion-content>
`
})
export class ModalContentPageExpired {
  BookingDetailSum;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public mulTra: MultiTransactionService,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public navCtrl: NavController
  ) {

  }


  payNow() {
    this.viewCtrl.dismiss("yes");
    // let details = this.BookingDetailSum;
    // console.log(details);
    // this.navCtrl.push(PaymentPage, { details, status });
  }

  dismiss() {
    this.viewCtrl.dismiss();
    //  this.navCtrl.setRoot(HomeScreenPage);
  }
}