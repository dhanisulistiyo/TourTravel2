import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { DailyService } from '../../providers/daily-service';
import { DestinationTransportPage} from '../destination-transport/destination-transport';
import { FilterTransport2Page } from '../filter-transport2/filter-transport2';

/**
 * Generated class for the TransportLocationservice page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transport-locationservice',
  templateUrl: 'transport-locationservice.html',
})
export class TransportLocationservice {
  service;
  location1;
  location2;
  transport1;
  transport2;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ds : DailyService,
   public viewCtrl: ViewController,
   public alertCtrl:AlertController,
   ) {
    this.service = navParams.data['itemser']  
    console.log(this.ds.transairport)
  }

   ionViewWillEnter() {
  //  if(this.service == 'PickUp') this.data= 'Pick-Up'
  //  if(this.service == 'DropOff') this.data= 'Drop-Off'
  //  if(this.service == 'PickAndDrop') this.data= 'Pick-Up And Drop-Off'
  this.location1 = null
  this.location2 = null
  this.transport1 = null
  this.transport2 = null
    let t = this.ds.transairport;
    let no = Object.keys(t).length;
    if(t["0"].location != null) this.location1 = t["0"].location.Name;
    if(t["0"].transportation != null)   this.transport1 = t["0"].transportation.Name+', '+t["0"].transportation.TransportationSeatTypeName+' Seater'
    if(no == 2){
    if(t["1"].location != null) this.location2 = t["1"].location.Name;
    if(t["1"].transportation != null)   this.transport2 = t["1"].transportation.Name+', '+t["1"].transportation.TransportationSeatTypeName+' Seater'
   }
}


 destinationTapped(event, id) {
   console.log(id);
    this.ds.setID(id);
    this.navCtrl.push(DestinationTransportPage);
  }


  vehicleTapped(event, id){
    var i : string = <string><any> id;
    if(this.ds.transairport[i.toString()].location != null){
    console.log(id);
    this.ds.setID(id);
    this.navCtrl.push(FilterTransport2Page);
    }else{
        this.showAlertLoc();
    }
  }

  doneTapped() {
    let t = this.ds.transairport;
    let no = Object.keys(t).length;
    if(no == 1){
      if(this.location1 == null || this.transport1 == null){
         this.showAlertFields();
      }else{
          
           this.toItenerary();
      } 
    }
    if(no == 2){
      if(this.location1 == null || this.transport1 == null || this.location2 == null|| this.transport2==null){
           this.showAlertFields();
      }else{
          
           this.toItenerary();
      } 
    }

  
  }

  toItenerary(){
     this.navCtrl.pop().then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });
  }

  showAlertFields() {
    let alert = this.alertCtrl.create({
      subTitle: 'Do not empty fields ',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertLoc() {
    let alert = this.alertCtrl.create({
      subTitle: 'Do not empty fields location ',
      buttons: ['OK']
    });
    alert.present();
  }

}
