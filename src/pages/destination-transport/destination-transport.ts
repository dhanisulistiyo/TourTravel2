import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocationService} from '../../providers/location-service';
import {DailyService} from '../../providers/daily-service';
//import { IteneraryBuilderPage } from '../itenerary-builder/itenerary-builder';
@Component({
  selector: 'page-destination-transport',
  templateUrl: 'destination-transport.html',
  providers: [LocationService]
})
export class DestinationTransportPage {
  //locations : Array< {Id: string, Name: string, ImageUrl: string, Country: string}>;
  locations : any = {};
  myKeys: String[];
  //locationItem :LocationPopoverComponent;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private locService: LocationService, 
  private ds: DailyService
  ) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DestinationPage');
  }

  searchLocationDB(event, key) {
      if(event.target.value != null){
        if(event.target.value.length > 2) {
            this.locService.searchLocation(event.target.value).subscribe(
                data =>  {        
                    console.log(data["Id"]) ;     
                    if(data["Id"]!=null) { 
                        var data1 = JSON.stringify({data});
                        var data2 = JSON.stringify(data)
                        console.log(data1);
                        console.log(data2);
                        this.locations= JSON.parse(data1);
                        this.myKeys = Object.keys(this.locations);
                     console.log(this.locations);
                    }else{ 
                    this.locations = data;
                    this.myKeys = Object.keys(this.locations);
                    console.log(this.locations);
                    }
                },
                err => {
                    console.log(err);
                },
                () => console.log('Movie Search Complete')
            );
        }
      }
    }


 

    setSelectedLocation(selectedItem) {
     console.log(selectedItem);
     this.ds.setLocationTransport(selectedItem);
     this.navCtrl.pop();
     //this.navCtrl.push(IteneraryBuilderPage);
  }

}
