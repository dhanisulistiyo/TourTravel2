import { Component } from '@angular/core';
import { MybookingOnPage } from '../mybooking-on/mybooking-on';
import { MybookingComPage } from '../mybooking-com/mybooking-com';

@Component({
  selector: 'page-mybooking',
  templateUrl: 'mybooking.html'
})
export class MybookingPage {

  tab1Root: any = MybookingOnPage;
  tab2Root: any = MybookingComPage;
  constructor() {

  }

}
