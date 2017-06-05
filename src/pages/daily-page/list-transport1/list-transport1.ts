import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {FilterTransportPage} from '../filter-transport/filter-transport';
import { FilterTransport1Page } from '../filter-transport1/filter-transport1';
import { TransportAirportservice1Page } from '../transport-airportservice1/transport-airportservice1';
import { TransportService } from '../../../providers/transport-service';
import { DailyService } from '../../../providers/daily-service';

@Component({
  selector: 'page-list-transport1',
  templateUrl: 'list-transport1.html',
  providers: [TransportService]
})
export class ListTransportPage1 {
  listtransports: Array<any>;
  transport: Array<any>;
  idAwal;
  idAkhir;
  des;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ds: DailyService,
    public tra: TransportService
  ) {
    this.des = navParams.data['des']
    this.idAwal = navParams.data['id']
    this.idAkhir = navParams.data['i']
  }

  ionViewWillEnter() {
    this.tra.listTransportFilterDaily(this.des).subscribe(data => {
      this.listtransports = data;
      this.transport = this.listtransports;
      console.log(this.listtransports);
    }, err => {
      console.log(err);
    },
      () => console.log('Transport Search Complete')
    );
  }

  listTransport() {
    this.transport = this.listtransports;
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


  setSelectedTransport(trans) {
    console.log(trans)
    let ser = (trans['TransportationItemServiceTypes']);
    let id = this.idAwal;
    let i = this.idAkhir;
    this.ds.setTransportation(id, i, trans)
    this.navCtrl.push(TransportAirportservice1Page, {id,i,ser});
  }

  filtertransTapped(event) {
    this.tra.delStorFilTra();
    this.navCtrl.pop();
    let des = this.des;
    let id = this.idAwal;
    let i = this.idAkhir;
    this.navCtrl.push(FilterTransport1Page,{ des, id, i});
  }


}
