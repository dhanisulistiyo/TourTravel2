import { HomeScreenPage } from './../home-screen/home-screen';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { MultiTransactionService } from '../../providers/multi-transaction-service';
//import { CustomePackagePage } from '../custome-package/custome-package';
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
  dateEx;
  dateNow;
  allow;
  companyInfo;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public mulTra: MultiTransactionService,
    public toastCtrl: ToastController,
    public info: UserandcompanyDetails,
    private viewCtrl: ViewController,
  ) {
    this.pay = null;
    this.BookingDetailSum = navParams.data['details']
    this.Status = navParams.data['status']
    this.allow = true;

    //this.allertNoExpireDate();
  }

  ionViewWillEnter() {
        this.userinfo = this.info.userinfo;
        this.companyInfo = this.info.companyInfo;
    }


  payTour() {
    console.log(this.pay);
    if (this.pay == "deposit") {
      if (this.Status == "created") {
        let status = "confirm"
        this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, status)
        this.navCtrl.pop().then(() => {
          const index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        });
        this.presentToast();
      } else {
        let loader = this.load.create({
          content: 'Please wait...'
        });

        this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, this.Status);
        this.navCtrl.setRoot(HomeScreenPage);
        loader.dismiss();
        this.presentToast();
      }
    } else if (this.pay == "hold") {
      this.presentToast();
      this.mulTra.clearCache();
      this.navCtrl.setRoot(HomeScreenPage);
    }
    else {
      this.alertPay();
    }
  }

  setPay(pay) {
    console.log(pay);
    this.pay = pay;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Your Booking has been payed',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();

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


   allertNoExpireDate(){
    let prompt = this.alertCtrl.create({
      title: 'Pay Booking ',
      message: "Do you want to pay this booking now?",
      buttons: [
        {
          text: 'Cancel',
          handler: ()=> {
            console.log('Cancel clicked');   
            if (this.Status == "created") {
                this.navCtrl.pop().then(() => {
                const index = this.viewCtrl.index;
                this.navCtrl.remove(index);
              });
            }else{
                this.navCtrl.setRoot(HomeScreenPage);
            }      
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Sukses clicked');
          }
        }
      ]
    });   
    prompt.present();
  }

  back(){
    this.navCtrl.pop();
  }


}
