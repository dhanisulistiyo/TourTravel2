
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocationService} from '../../../providers/location-service';
import {DailyService} from '../../../providers/daily-service';


@Component({
  selector: 'page-destination2',
  templateUrl: 'destination2.html',
  providers: [LocationService]
})
export class DestinationPage2 {
  locations : any = {};
  myKeys: String[];
  idAwal;
  idAkhir;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private locService: LocationService, 
  public ds : DailyService  
  ) {
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }


  ionViewDidLoad() {
    console.log(this.idAwal);
    console.log(this.idAkhir);
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
                () => console.log('Location Search Complete')
            );
        }
      }
    }


 

    setSelectedLocation(selectedItem) {
     console.log(selectedItem);
     this.ds.setLocation(this.idAwal, this.idAkhir, selectedItem);
     this.navCtrl.pop();

  }

}
