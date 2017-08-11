import { Component } from '@angular/core';
import {  } from 'ionic-angular';
import { MyprofilePage } from '../myprofile/myprofile';
import { ChangepasswordPage } from '../changepassword/changepassword';

/**
 * Generated class for the MyaccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {

  tab1Root: any = MyprofilePage;
  tab2Root: any = ChangepasswordPage;
  
  constructor() {

  }

}
