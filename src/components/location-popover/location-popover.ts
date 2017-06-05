
import { Component } from '@angular/core';
import {ViewController, NavController} from 'ionic-angular';
import { DestinationPage  } from '../../pages/destination/destination';
import { IteneraryService } from '../../providers/itenerary-service';


@Component({
  selector: 'location-popover',
  templateUrl: 'location-popover.html'
})
export class LocationPopoverComponent {

  locationList = [{Id: 'Denpasar'}, {Id: 'Yogyakarta'}, {Id: 'Choose Destination'}];
  selectedLocation: string;
  
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, private ite: IteneraryService, ) {
    this.selectedLocation = "";
  }


  public setSelectedLocation(selectedItem) {
    if(selectedItem != 'Choose Destination'){
      this.selectedLocation = selectedItem;
      this.ite.setDestination(selectedItem);
      this.viewCtrl.dismiss(this.selectedLocation);
    }else{
      this.navCtrl.push(DestinationPage);
      this.viewCtrl.dismiss();
      
    }
  }

}
