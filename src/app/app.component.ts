import { Component, ViewChild,Injectable } from '@angular/core';
import { Platform, MenuController, Nav, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//screen Page
import { HomePage } from '../pages/home/home';
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
  
  pages: Array<{title: string, component: any}>;
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
      { title: 'Home', component: HomePage },
      { title: 'My Account', component: MyaccountPage },
      { title: 'My Company', component: MycompanyPage },
      { title: 'My Booking', component: MybookingPage },
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
    this.menu.close();
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

    public logout() {
       this.auth.logout();
            this.username=null;
            this.password=null;
             return LoginPage;
    }


    
    
}
