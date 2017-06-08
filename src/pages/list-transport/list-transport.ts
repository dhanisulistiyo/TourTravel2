import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {FilterTransportPage} from '../filter-transport/filter-transport';
//import {TransportAirportservicePage} from '../transport-airportservice/transport-airportservice';
import {FilterTransport2Page} from '../filter-transport2/filter-transport2';
import {TransportService} from '../../providers/transport-service';
import {DailyService} from '../../providers/daily-service';

@Component({
  selector: 'page-list-transport',
  templateUrl: 'list-transport.html',
   providers: [TransportService]
})
export class ListTransportPage {
  listtransports: Array<any>;
  transport: Array<any>;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public ds : DailyService,
  public tra : TransportService
  ) {}

   ionViewWillEnter() {
    this.tra.listTransportAirport().subscribe(data=>{
            this.listtransports=data;
            this.transport=this.listtransports;
            console.log(this.listtransports);
            },err => {
                    console.log(err);
                },
                () => console.log('Transport Search Complete')
            );
  }

  listTransport(){
      this.transport=this.listtransports;
    }

getItems(searchbar) {
          // Reset items back to all of the items
          this.transport;
          // set q to the value of the searchbar
          var q = searchbar.target.value;
          // if the value is an empty string don't filter the items
          if (q.trim() == '') {
            this.listTransport();
            return;
          }

          this.transport = this.transport.filter((v) => {

            if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              return true;
              }
              return false;
            })

        }


    // setSelectedTransport(trans){
    //  console.log(trans);
    //  var data = JSON.stringify({trans});
    //  console.log(data);
    //  this.ite.setTransport(data);
    //  this.navCtrl.push(TransportAirportservicePage);
    // }

    setSelectedTransport(trans){
     this.ds.setTransportationAirport(trans);
     this.navCtrl.pop();
    }

     filtertransTapped(event) {
       this.tra.delStorFilTra();
       this.navCtrl.pop();
       this.navCtrl.push(FilterTransport2Page);
  }

  
}
