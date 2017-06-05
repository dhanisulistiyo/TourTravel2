import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import {IteneraryBuilderPage} from '../itenerary-builder/itenerary-builder'
import { IteneraryService } from '../../providers/itenerary-service';
import { LocationPopoverComponent } from '../../components/location-popover/location-popover';
//import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-custome-package',
  templateUrl: 'custome-package.html',
   providers: [LocationPopoverComponent]
})
export class CustomePackagePage {
  selectedLocation: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,  
      private ite: IteneraryService, 
      public popoverCtrl: PopoverController,
      ) {
            this.selectedLocation = this.ite.destination;    
            
      }


      ionViewWillEnter(){
        if(this.ite.getDestination() != null){
          this.selectedLocation = this.ite.getDestination(); 
        }else{
          this.selectedLocation = "Selected Destination";   
        }   
      }

      itineraryCusTapped(event) {
        this.navCtrl.push(IteneraryBuilderPage);
      }

  locationPopover(ev){
      let popover = this.popoverCtrl.create(LocationPopoverComponent, {
    });
    popover.present({
      ev: ev
    });

     popover.onDidDismiss((popoverData) => {
       if(popoverData != null){
         if(popoverData != undefined){
          this.selectedLocation = popoverData;
          //this.ite.setDestination(popover);
         }else{      
           this.selectedLocation = this.ite.getDestination(); 
         }
      }else{
          if(this.ite.getDestination()==null){
            this.selectedLocation = "Selected Destination"; 
          }else{
          this.selectedLocation = this.ite.getDestination();
          }
      }
    })

  }
  

}
