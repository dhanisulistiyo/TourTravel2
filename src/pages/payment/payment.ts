import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { MultiTransactionService } from '../../providers/multi-transaction-service';
import { CustomePackagePage } from '../custome-package/custome-package';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';
/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  pay;
  BookingDetailSum;
  Status;
  userinfo;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public mulTra: MultiTransactionService,
    public toastCtrl: ToastController,
     public info:UserandcompanyDetails
  ) {
    this.pay = null;
    this.BookingDetailSum = navParams.data['details']
    this.Status = navParams.data['status']
  }

   ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();


    this.info.getUser().subscribe(data=>{
      this.userinfo = data;
      loader.dismiss();
    },err => {
                    console.log(err);
                    loader.dismiss();
                },
                () => console.log('Get Transaction Complete')
    );   
   }

  payTour() {
    console.log(this.pay);
    if (this.pay != "card") {
          //this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, status)
      this.presentToast();
    }else{
        this.alertPay();
    }
  }

  setPay(pay) {
    console.log(pay);
    this.pay = pay;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Your Booking has been saved in Sistem',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
    this.navCtrl.setRoot(CustomePackagePage);
  }

  alertPay() {
    let alert = this.alertCtrl.create({
      title: "No Booking",
      subTitle: "Can not Booking using this payment",
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('Saved clicked');
        }
      }]
    });
    alert.present();
  }

}
