import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { IteneraryBuilderPage } from '../itenerary-builder/itenerary-builder'
import { IteneraryService } from '../../providers/itenerary-service';
import { LocationPopoverComponent } from '../../components/location-popover/location-popover';
import { HistoryService } from '../../providers/history-service';
import { TourDetailsPage } from '../tour-details/tour-details';

@Component({
  selector: 'page-custome-package',
  templateUrl: 'custome-package.html',
  providers: [LocationPopoverComponent]
})
export class CustomePackagePage {
  selectedLocation: any;
  HistoryBookingOpen: any;
  count;
  com;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ite: IteneraryService,
    public popoverCtrl: PopoverController,
    public his: HistoryService,
    public load: LoadingController
  ) {
    this.selectedLocation = this.ite.destination;
    this.com = 0;
  }


  ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Please wait...'
    });
    if (this.ite.getDestination() != null) {
      this.selectedLocation = this.ite.getDestination();
    } else {
      this.selectedLocation = "Selected Destination";
    }



    this.his.getHistoryTransactions().subscribe(data => {
      this.count = Object.keys(data).length;
      if (this.selectedLocation == "Selected Destination") {
        if (this.count != 0) {
          this.HistoryBookingOpen = data[0];
        } else {
          this.HistoryBookingOpen = null;
        }
      } else {
        if (this.count != 0) {
          this.HistoryBookingOpen = data[0];
        } else {
          this.HistoryBookingOpen = null;
        }
      }
    }, err => {
      console.log(err);
      this.HistoryBookingOpen = null;
      loader.dismiss();
    },
      () => console.log('Get History Transaction Complete')
    );

  }

  itineraryCusTapped(event) {
    this.navCtrl.push(IteneraryBuilderPage);
  }

  detailTourTapped(event, id) {
    this.navCtrl.push(TourDetailsPage, id);
  }

  locationPopover(ev) {
    let popover = this.popoverCtrl.create(LocationPopoverComponent, {
    });
    popover.present({
      ev: ev
    });

    popover.onDidDismiss((popoverData) => {
      if (popoverData != null) {
        if (popoverData != undefined) {
          this.selectedLocation = popoverData;
          //this.ite.setDestination(popover);
        } else {
          this.selectedLocation = this.ite.getDestination();
        }
      } else {
        if (this.ite.getDestination() == null) {
          this.selectedLocation = "Selected Destination";
        } else {
          this.selectedLocation = this.ite.getDestination();
        }
      }
    })

  }


}
