import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-token-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../../pages/home/home';



@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loading: Loading;
    registerCredentials = { companyid:'' ,username: '', password: '' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController,public menu: MenuController) { 
    this.menu.enable(false);
    }

    public createAccount() {
        this.nav.push(RegisterPage);
    }

    public login() {
        this.auth.login(this.registerCredentials).then(allowed => {           
            if (allowed) {
                // setTimeout(() => {                  
                //     this.loading.dismiss();
                    this.nav.setRoot(HomePage);
                    this.auth.getUserInfo();
                    this.menu.enable(true);
                    //this.myApp.menuOpened();
                    
                // });
            } else {
                this.showError("Username And password not match");
                return 0;
            }
        },
            error => {
                this.showError(error);
            });
    }


    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    showError(text) {
        setTimeout(() => {
            //this.loading.dismiss();
        });

        let alert = this.alertCtrl.create({
            title: 'Failed!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}