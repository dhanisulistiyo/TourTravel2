import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-token-service';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    createSuccess = false;
    registerCredentials = { company_name: '', first_name: '', last_name: '', email: '', username: '', password: '', con_password: '' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, public load: LoadingController) { }

    public register() {
        let reg = this.registerCredentials;
        if (reg.password != reg.con_password) {
            this.showAlertValidasiPassword();
        } else {
            let loader = this.load.create({
                content: 'Please wait...'
            });
            loader.present();
            this.auth.register(this.registerCredentials).then(success => {
                if (success) {
                    loader.dismiss();
                    this.createSuccess = true;
                    this.showPopup("Success", "Account created.");
                } else {
                    loader.dismiss();
                    this.showPopup("Error", "Problem creating account.");
                }
            },
                error => {
                    loader.dismiss();
                    this.showPopup("Error", error);
                });
        }
    }

    public login() {
        this.nav.pop();
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