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
        var validEmail
        var validPass
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        let PASS_REGEXP = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"~`^*(),./:;]).*$/i ;
        let reg = this.registerCredentials;
        if(reg.first_name==""){
            this.showPopup("Error", "Please Input Name."); 
        }else if(reg.email==""){
            this.showPopup("Error", "Please Input Email.");      
        }else if(reg.username==""){
            this.showPopup("Error", "Please Input Username.");
        }else if(reg.password==""){
            this.showPopup("Error", "Please Input Password.");
        }else if(reg.password != reg.con_password) {
            this.showPopup("Error", "Password and Confirm Password Not Match.");
        }else{
            if (reg.email.length <= 5 || !EMAIL_REGEXP.test(reg.email)) validEmail = false; 
            else  validEmail = true;

             if (reg.password.length <8 || !PASS_REGEXP.test(reg.password)) validPass = false; 
            else  validPass = true;

            if(!validEmail){
                this.showPopup("Error", "Wrong Format Input Email.");
            }else if(!validPass){            
                 this.showPopup("Error", "Password minimum 8 characters and at least one uppercas, one lowercase, one special character.");
            }else{
                let loader = this.load.create({
                    content: 'Please wait...'
                });
                loader.present();
                this.auth.register(this.registerCredentials).then(success => {
                if (success) {
                        this.createSuccess = true;
                        this.showPopup("Success", "Account created.");
                }else{
                    this.showPopup("Error", "Failed to create account. Please try again latter ...");
                }
                    loader.dismiss();
                },error => {
                        loader.dismiss();
                        this.showPopup("Error", error);
                });
            }
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

}