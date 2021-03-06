import { FixedpackageDetailsPage } from './../fixedpackage-details/fixedpackage-details';
import { IteneraryBuilderPage } from './../itenerary-builder/itenerary-builder';
import { FixedPackageProvider } from './../../providers/fixed-package';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the FixedpackageAllPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-fixedpackage-all',
  templateUrl: 'fixedpackage-all.html',
})
export class FixedpackageAllPage {
  type
  listFixedPackage: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public load: LoadingController,
  private fixService: FixedPackageProvider) {
    this.type = navParams.data["type"];

  }

  ionViewWillEnter(){
    let loader = this.load.create({
      content: 'Please wait...'
    });
    loader.present();
    this.fixService.showFixedPackageByFilter(this.type).subscribe(data => {
      this.listFixedPackage = data;
      console.log(data)
      loader.dismiss()

    }, err => {
      console.log(err);
    }, () => console.log("Hello Fix Package")
  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedpackageAllPage');
  }

  gotoCustom(){
    this.navCtrl.push(IteneraryBuilderPage)
  }

  detailTour(id){
    this.navCtrl.push(FixedpackageDetailsPage, {id})
  }
}
