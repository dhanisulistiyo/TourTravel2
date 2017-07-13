import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { MultiTransactionService } from '../../providers/multi-transaction-service';
import { CustomePackagePage } from '../custome-package/custome-package';
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
  Id;
  Status;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public mulTra: MultiTransactionService,
    public toastCtrl: ToastController
  ) {
    this.pay = null;
    this.Id = navParams.data['id']
    this.Status = navParams.data['status']
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
