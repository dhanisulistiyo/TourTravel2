import { UserandcompanyDetails } from './../../providers/userandcompany-details';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-token-service';
import { RegisterPage } from '../register/register';
import { HomeScreenPage } from './../home-screen/home-screen';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    public loader= this.load.create();
    registerCredentials = { companyid:'' ,username: '', password: '' };

    constructor(public nav: NavController, private auth: AuthService, 
        private alertCtrl: AlertController,public load : LoadingController, 
        public menu: MenuController, public info: UserandcompanyDetails) { 
    this.menu.enable(false);
    }

    public createAccount() {
        this.nav.push(RegisterPage);
    }

    public login() {
         let loader = this.load.create({
            content: 'Please wait...'
        });
        loader.present();
        this.auth.login(this.registerCredentials).then(allowed => {           
            if (allowed) {                     
                    this.nav.setRoot(HomeScreenPage);
                    this.auth.getUserInfo();
                    this.info.getDetails();
                    this.menu.enable(true); 
                    loader.dismiss();        
            } else {
                this.showError("Username and password is incorrect or connection failed");
                loader.dismiss();
                return 0;
            }
        },
            error => {
                this.showError(error);
                loader.dismiss(); 
            });
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Failed!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}