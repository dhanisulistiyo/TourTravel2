import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ViewController } from 'ionic-angular';
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
    public info:UserandcompanyDetails,
    private viewCtrl: ViewController,
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
        if(this.Status == "created"){
          //this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, status)
        let status = "confirm"
        this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, status)
        
        this.navCtrl.pop().then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
        });
      this.presentToast();
      }else{
        this.mulTra.getConfirmTour(this.BookingDetailSum[0].Id, this.Status)
        this.presentToast();
        this.navCtrl.setRoot(CustomePackagePage);
      }
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

}
