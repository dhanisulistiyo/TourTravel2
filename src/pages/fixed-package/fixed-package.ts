import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-fixed-package',
  templateUrl: 'fixed-package.html'
})
export class FixedPackagePage {

  // sections;
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  // this.sections = ['Culture 1', 'Culture 2', 'Culture 3']
  this.items = [[0, 1, 2], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4]]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedPackagePage');
  }

}
