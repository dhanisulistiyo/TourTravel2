import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-token-service';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    createSuccess = false;
    registerCredentials = { company_name: '', first_name: '', last_name: '', email:'', username:'' , password:'', con_password:'' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

    public register() {
        let reg = this.registerCredentials;
        if(reg.password != reg.con_password){
            this.showAlertValidasiPassword();
        }else {
        this.auth.register(this.registerCredentials).then(success => {
            //console.log(success);
            if (success) {
                this.createSuccess = true;
                this.showPopup("Success", "Account created.");
            } else {
                this.showPopup("Error", "Problem creating account.");
            }
        },
            error => {
                this.showPopup("Error", error);
            });
        }
    }

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        if (this.createSuccess) {
                            this.nav.popToRoot();
                        }
                    }
                }
            ]
        });
        alert.present();
    }


    showAlertValidasiPassword() {
    let alert = this.alertCtrl.create({
      subTitle: 'Password and Confirm Password Not Match',
      buttons: ['OK']
    });
    alert.present();
  }

}