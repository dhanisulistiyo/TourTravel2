import { ReadyPackageProvider } from './../../providers/ready-package';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ReadypackageDetailsPage } from './../readypackage-details/readypackage-details';
import { IteneraryBuilderPage } from './../itenerary-builder/itenerary-builder';

/**
 * Generated class for the ReadyPackagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-ready-package',
  templateUrl: 'ready-package.html',
})
export class ReadyPackagePage {
  showToolbar: boolean = false;
  active: boolean = true;
  listReadyPackage:Array<any>;
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, 
    public navParams: NavParams, public load: LoadingController, public ready: ReadyPackageProvider) {
      this.listReadyPackage = [];
      let loader = this.load.create({
        content: 'Please wait...'
      });
      loader.present();
      this.ready.showReadyPackagebyFilter().subscribe(data => {
        this.listReadyPackage = data;
        console.log(data)
        loader.dismiss()
      }, err => {
        console.log(err);
        loader.dismiss()
      }, () => console.log("Hello Ready Package")
    );
  }
  
  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  readyHoneymoon() {
    this.navCtrl.push(ReadypackageDetailsPage);
  }

  btnPick() {
    this.active = false;
  }

  btnCustomMenu(){
    this.navCtrl.push(IteneraryBuilderPage);
  }

}
