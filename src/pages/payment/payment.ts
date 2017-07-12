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
  pay
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public mulTra: MultiTransactionService,
    public toastCtrl: ToastController
  ) {
    this.pay = null;
  }

  payTour() {
    console.log(this.pay);
    if (this.pay != "card") {
      let loader = this.load.create({
        content: 'Please wait...'
      });
      loader.present();
      this.mulTra.getTourTransaksi().subscribe(data => { console.log(data); }, err => { console.log(err); }, () => console.log('post Transaction Complete'));
      loader.dismiss();
      
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
