import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Screen Apps
import { HomePage } from '../pages/home/home';
import { MybookingPage } from '../pages/mybooking/mybooking';
import { Myprofile } from '../pages/myprofile/myprofile';
import { Mycompany } from '../pages/mycompany/mycompany';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-token-service';
@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  username;
  password;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Booking', component: MybookingPage },
      { title: 'My Profile', component: Myprofile },
      { title: 'My Company', component: Mycompany },
      { title: 'Logout', component: this.logout() }
   
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  ionViewWillEnter(){
    let info = this.auth.userInfo();
    this.username = info.username;
    this.password = info.password;
  }

 public menuOpened(){
    let info = this.auth.userInfo();
    this.username = info.username;
    this.password = info.password;
  }

  setUser(user){
    this.username = user;
  }

 

  public logout() {
        this.auth.logout();
        this.username=null;
        this.password=null;
        return LoginPage;
    }

}
