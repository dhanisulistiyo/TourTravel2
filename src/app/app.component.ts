import { Component, ViewChild,Injectable } from '@angular/core';
import { Platform, MenuController, Nav, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//screen Page
import { HomeScreenPage } from './../pages/home-screen/home-screen';
import { MybookingPage } from '../pages/mybooking/mybooking';
import { LoginPage } from '../pages/login/login';
import { MycompanyPage } from '../pages/mycompany/mycompany';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { AuthService } from '../providers/auth-token-service';


@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})

@Injectable()
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user;
  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  
  pages: Array<{title: string, component: any, icon: any}>;
  username;
  password;
  //userInfo: Array<{username: string, email: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public alertCtrl : AlertController,
    public load: LoadingController
    ) {
      
    this.initializeApp();
    //this.userInfo = this.user;
    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomeScreenPage, icon: 'ios-home-outline' },
      { title: 'My Account', component: MyaccountPage, icon: 'ios-contact-outline' },
      { title: 'My Company', component: MycompanyPage, icon: 'ios-laptop-outline' },
      { title: 'My Booking', component: MybookingPage, icon: 'ios-list-box-outline' },
      { title: 'Logout', component: this.logout(), icon: 'ios-log-out-outline' }  
    ];
  }

  initializeApp() {
      this.platform.ready().then(() => {
      setTimeout(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
      }, 200);
     
      
    });
  }

  openPage(page) {
    this.menu.close();
    if(page.title == 'Logout') this.logout();
    this.nav.setRoot(page.component);
  }

  public menuOpened(){
    let info = this.auth.userInfo();
    this.username = info.username;
    this.password = info.password;
  }

  setUser(user){
    this.username = user;
  }

  ionViewWillEnter(){
    let info = this.auth.userInfo();
    this.username = info.username;
    this.password = info.password;
  }

  logout() {
            this.auth.logout();
            this.username=null;
            this.password=null;
             return LoginPage;
    }


    
    
}
