import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController} from 'ionic-angular';
import { UserandcompanyDetails } from '../../providers/userandcompany-details';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  change = { old_password:'', new_password: '', con_password: '' };
  Profile;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public alertCtrl: AlertController,  
  public info : UserandcompanyDetails,
  public load : LoadingController) {
    this.info.getUser().subscribe(data => {
    this.Profile = data
    });
  }

changepassword(){
  let change = this.change;
  if (change.new_password != change.con_password) {
            this.showAlertValidasiPassword();
        } else {

        let loader = this.load.create({
            content: 'Please wait...'
        });
        loader.present();
             this.info.changePassword(change).then(data => {           
            if (data) {  
                console.log(data)
                loader.dismiss();
                this.showPopup("Password is success updated");
            
            } else {
                console.log(data)
                loader.dismiss();
                this.showError("Password can't updated or connection failed");
                
            }
        },
            error => {
               console.log(error)
                this.showError(error);

            });
        }
}

showPopup(text) {
         let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
        });
        this.change = { old_password:'', new_password: '', con_password: '' }; 
        alert.present(prompt);
    }

showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Failed!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
 showAlertValidasiPassword() {
        let alert = this.alertCtrl.create({
            subTitle: 'Password and Confirm Password Not Match',
            buttons: ['OK']
        });
        alert.present();
    }

}
