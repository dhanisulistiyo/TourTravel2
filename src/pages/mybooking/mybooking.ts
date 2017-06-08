import { Component } from '@angular/core';
import { MybookingOnPage } from '../mybooking-on/mybooking-on';
import { MybookingComPage } from '../mybooking-com/mybooking-com';
import { MybookingCancel } from '../mybooking-cancel/mybooking-cancel';
@Component({
  selector: 'page-mybooking',
  templateUrl: 'mybooking.html'
})
export class MybookingPage {

  tab1Root: any = MybookingOnPage;
  tab2Root: any = MybookingComPage;
  tab3Root: any = MybookingCancel;
  constructor() {

  }

}
