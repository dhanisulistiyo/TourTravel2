import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
import {LocationService} from '../../providers/location-service';
import {IteneraryService} from '../../providers/itenerary-service';
import { HomePage  } from '../../pages/home/home';
@Component({
  selector: 'page-destination',
  templateUrl: 'destination.html',
  providers: [LocationService, IteneraryService]
})
export class DestinationPage {
  //locations : Array< {Id: string, Name: string, ImageUrl: string, Country: string}>;
  locations : any = {};
  myKeys: String[];
  //locationItem :LocationPopoverComponent;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private locService: LocationService, 
  private ite: IteneraryService,
  public viewCtrl: ViewController
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
     this.ite.setDestination(selectedItem);
     //this.viewCtrl.dismiss();
     this.navCtrl.pop();
     this.navCtrl.setRoot(HomePage);
  }

}
